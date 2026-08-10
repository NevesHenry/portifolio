export type Project = {
  slug: string;
  title: string;
  status: "building" | "planned" | "live";
  /** Card blurb on /projects. */
  description: string;
  /** Card tags — the headline technologies only. */
  tags: string[];
  repo: string;
  caseStudy: {
    /** One sentence: what the thing is, and the constraint that shapes it. */
    tagline: string;
    /** Full stack, for the case study header. */
    stack: string[];
    /** Why this project exists — paragraphs. */
    context: string[];
    trace: {
      caption: string;
      steps: { label: string; detail: string }[];
    };
    /** The engineering choices worth defending in an interview. */
    decisions: { label: string; detail: string }[];
    /** What was deliberately left out, and where it would go. */
    tradeoff: string;
    tests: {
      command: string;
      covered: string[];
    };
    run: string;
  };
};

export const projects: Project[] = [
  {
    slug: "event-driven-microservices",
    title: "Event-driven microservices",
    status: "live",
    description:
      "Two Spring Boot services — orders and inventory — that talk only through RabbitMQ events. Idempotent consumers, atomic stock reservation, and dead-lettering: the same patterns I worked with in production at Axur.",
    tags: ["Spring Boot", "RabbitMQ", "Docker"],
    repo: "https://github.com/NevesHenry/microservices-events-demo",
    caseStudy: {
      tagline:
        "Two Spring Boot services that talk only through RabbitMQ events — no service-to-service HTTP calls anywhere.",
      stack: [
        "Java 21",
        "Spring Boot 4.1",
        "Spring AMQP",
        "RabbitMQ 4",
        "H2",
        "Testcontainers",
        "Docker Compose",
      ],
      context: [
        "At Axur I worked on distributed data-processing systems where services coordinated through events rather than direct calls. That style is easy to describe and hard to demonstrate, so I rebuilt the interesting half of it: choreography over orchestration, with the failure modes that actually bite in production — duplicate deliveries, concurrent stock updates, and messages that can never succeed.",
        "The rule I held myself to is that neither service knows the other's address. They share an exchange and a pair of event contracts, nothing else. Each one even declares its own copy of the event records instead of importing a shared library — services own their contracts rather than coupling through a common artifact.",
      ],
      trace: {
        caption:
          "One order, end to end. Steps 2 through 4 are the whole conversation between the two services.",
        steps: [
          {
            label: "POST /orders",
            detail:
              "order-service persists the order as PENDING and publishes order.created to the shop.events topic exchange.",
          },
          {
            label: "order.created",
            detail:
              "Routed to inventory.order-created. inventory-service picks it up; the payload is validated again at the consumer, so a negative quantity is rejected rather than quietly added back to stock.",
          },
          {
            label: "reserve stock",
            detail:
              "An atomic conditional decrement — UPDATE ... WHERE stock >= qty — so concurrent orders cannot oversell. The outcome is written to a reservation row keyed by order id.",
          },
          {
            label: "inventory.updated",
            detail:
              "Published only after the reservation transaction commits, carrying RESERVED or REJECTED.",
          },
          {
            label: "order CONFIRMED / REJECTED",
            detail:
              "order-service consumes the result from orders.inventory-updated and moves the order to its final state.",
          },
        ],
      },
      decisions: [
        {
          label: "idempotent by record, not by luck",
          detail:
            "The reservation row keyed by order id is the idempotency record. A redelivered event never decrements twice — it finds the stored outcome and republishes it. This matters because RabbitMQ gives at-least-once delivery, so redelivery is normal operation, not an incident.",
        },
        {
          label: "no oversell under concurrency",
          detail:
            "Stock is reserved with a single conditional UPDATE instead of a read-then-write. Two consumers racing for the last item produce one RESERVED and one REJECTED, with no row-level locking to reason about.",
        },
        {
          label: "poison messages get dead-lettered",
          detail:
            "Each message is attempted three times, 500 ms apart. One that still fails is routed through shop.events.dlx to shop.events.dlq instead of requeueing forever — a single bad payload cannot spin a consumer at 100% CPU.",
        },
        {
          label: "either service can boot first",
          detail:
            "Both declare the full topology at startup, including the other side's consumer queue. Without that, whichever service starts first publishes into an unbound exchange and the events are silently dropped.",
        },
        {
          label: "publish after commit",
          detail:
            "The inventory result is published once its transaction has committed. If the publish then fails, the delivery is still unacked, so it is retried and the stored outcome republished — the database and the event stream do not disagree.",
        },
      ],
      tradeoff:
        "Publishing is fire-and-forget: no publisher confirms, and the order is saved and its event published without a shared transaction. Under a broker outage at exactly the wrong moment, an order could persist with no event. The production-grade fix is a transactional outbox — Debezium or a polling publisher — which is out of scope here; the seam where it would go is OrderService.createOrder.",
      tests: {
        command: "./mvnw test",
        covered: [
          "event published on order creation",
          "validation failures publish nothing",
          "confirmation and rejection driven by inventory events",
          "atomic stock reservation",
          "the zero-stock rejection path",
          "the negative-quantity contract guard",
          "duplicate delivery: no double decrement, result republished",
        ],
      },
      run: "docker compose up --build",
    },
  },
  {
    slug: "fullstack-aws-file-vault",
    title: "Full-stack AWS file vault",
    status: "live",
    description:
      "A React front end uploading through a Spring Boot API into S3 — LocalStack locally, real AWS by flipping one property. The interesting parts are the storage integration and the deploy topology, not the CRUD.",
    tags: ["React", "Spring Boot", "AWS S3"],
    repo: "https://github.com/NevesHenry/fullstack-aws-demo",
    caseStudy: {
      tagline:
        "A file vault on S3 where the same code runs against LocalStack and real AWS — the difference is one property, not a branch.",
      stack: [
        "Java 21",
        "Spring Boot 4.1",
        "AWS SDK v2",
        "React 19 (Vite + TS)",
        "LocalStack",
        "nginx",
        "Testcontainers",
        "Docker Compose",
      ],
      context: [
        "Most full-stack samples stop at a form wired to a database. I wanted the part that actually shows up in real work: talking to managed cloud storage, and doing it in a way that survives the move from a laptop to AWS without a rewrite.",
        "So the AWS integration is real — the AWS SDK v2, real S3 semantics, real object keys — while LocalStack stands in for the account during development. The client that talks to S3 is configured in exactly one place: when app.s3.endpoint is set it points at LocalStack with path-style access and test credentials; when it is empty, the SDK's default credential chain takes over and the same build runs against a real bucket.",
      ],
      trace: {
        caption:
          "Upload, then download. Note that the browser never talks to the API on a second origin.",
        steps: [
          {
            label: "browser → nginx",
            detail:
              "nginx serves the React production build and proxies /api/* to the backend, so everything is same-origin.",
          },
          {
            label: "POST /api/files",
            detail:
              "The backend streams the multipart upload into S3 under the key <uuid>/<original-name>. Empty uploads are rejected with 400.",
          },
          {
            label: "GET /api/files",
            detail:
              "Lists the bucket contents, mapping each object back to a display name and size.",
          },
          {
            label: "GET /api/files/{id}/{name}",
            detail:
              "Streams the object back through the API, with a Content-Disposition header encoded per RFC 5987 so non-ASCII filenames survive the round trip. A missing object maps to 404.",
          },
        ],
      },
      decisions: [
        {
          label: "same-origin by design, so no CORS",
          detail:
            "Putting nginx in front of both the static build and the API means there is no CORS configuration anywhere in the project. That is not a shortcut — it is the same shape this would take behind an ALB or CloudFront in production, so the local topology teaches the real one.",
        },
        {
          label: "UUID-prefixed object keys",
          detail:
            "Keys are <uuid>/<original-name>, so two people uploading report.pdf get two objects instead of one silently overwriting the other, and the original name stays readable when browsing the bucket.",
        },
        {
          label: "streaming download instead of presigned URLs",
          detail:
            "A presigned URL from LocalStack points at a hostname that only resolves inside the compose network, which would break the demo for anyone cloning it. Streaming through the API keeps it self-contained. At real scale the presigned GET is the right call — it takes file bytes off the API entirely — and the seam is S3StorageService.download.",
        },
        {
          label: "startup check assumes least privilege",
          detail:
            "On boot the app checks the bucket with headBucket and only creates it when missing, so a pre-created bucket needs no s3:CreateBucket permission. The minimal policy is PutObject, GetObject and ListBucket — which is what you would actually be granted in a real account.",
        },
      ],
      tradeoff:
        "There is no authentication and no per-user isolation: anyone who reaches the API can list and download everything. That is deliberate for a demo you can run in one command, but it is the first thing that would have to change before this held real files — and it would mean a user identity on the object key prefix, not just a login screen.",
      tests: {
        command: "./mvnw test",
        covered: [
          "upload → list → download round trip, bytes compared",
          "same-name uploads kept as separate objects",
          "empty upload rejected with 400",
          "missing object mapped to 404",
        ],
      },
      run: "docker compose up --build",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

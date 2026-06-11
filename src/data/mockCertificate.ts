import type { Certificate }
from "../types/certificate";

export const mockCertificates:
Certificate[] = [

  {
    id:
      "79c4ff65-ff58-4d08-9ef9-af59523aaeed",

    participant: {

      id:
        "6e688bde-3542-4d69-8b10-dc71b9b899c2",

      firstName: "Juan",

      lastName:
        "Perez Pereira",

      ci: "123455667",

      course: {

        id:
          "bda3bd5e-3381-4346-8797-8fae6d5c4e00",

        name:
          "Advanced React Architecture and Dynamic Certificate Rendering System",

        startDate:
          "2026-01-10T00:00:00.000Z",

        endDate:
          "2026-02-10T00:00:00.000Z",

        workloadsHours: 40,
      },
    },

    issueDate:
      "2026-05-29T15:23:48.004Z",

    verificationCode:
      "2afa6653-20a3-4e3e-a149-dbcd0c7982fc",
  },

];
import "dotenv/config";
import { z } from "zod";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

const app = Fastify({
  logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  schema: {
    description: "Hello route",
    tags: ["Hello"],
    response: {
      // 👈 FALTAVA ISSO
      200: z.object({
        message: z.string(),
      }),
    },
  },
  handler: async () => {
    return {
      message: "Hello",
    };
  },
});

await app.listen({ port: 3000 });


import { inngest } from "../../../inngest/client";
import { processVideo } from "@/inngest/function";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processVideo],
});

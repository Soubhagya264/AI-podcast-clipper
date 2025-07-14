import { Inngest } from "inngest";
// import {env} from "../env";

// Create a client to send and receive events
export const inngest = new Inngest({ 
    eventKey:process.env.NEXT_PUBLIC_INNGEST_EVENT_KEY,
    id: "Ai-podcast-clipper" });

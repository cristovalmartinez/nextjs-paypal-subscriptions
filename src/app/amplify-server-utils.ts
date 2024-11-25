import { createServerRunner } from "@aws-amplify/adapter-nextjs"
import {
  generateServerClientUsingCookies,
  generateServerClientUsingReqRes,
} from "@aws-amplify/adapter-nextjs/api"
import { cookies } from "next/headers"
import config from "@/amplifyconfiguration.json"

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
})

export const reqResBasedClient = generateServerClientUsingReqRes({
  config,
})

export const cookieBasedClient = generateServerClientUsingCookies({
  config: config,
  cookies,
})

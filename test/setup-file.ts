/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

import type { GetOption, Http, PostOption } from "client-ext-animevsub-helper"
import { AppInfo } from "raiku-pgs/plugin"
import { parseDom } from "raiku-pgs/thread"

type Response<Type extends GetOption["responseType"]> = Omit<
  Awaited<ReturnType<typeof Http.get>>,
  "data"
> & {
  data: Type extends "json"
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    : Type extends "arraybuffer"
    ? ArrayBuffer
    : string
}
function get<ReturnType extends GetOption["responseType"] | undefined>(
  options: Omit<GetOption, "responseType"> & {
    responseType?: ReturnType
  }
): Promise<Response<ReturnType>> {
  return fetch(options.url, {
    headers: options.headers
  }).then(async (res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, functional/no-let
    let data: any
    switch (options.responseType) {
      case "arraybuffer":
        data = await res.arrayBuffer()
        break
      case "json":
        data = JSON.parse(await res.text())
        break
      default:
        data = await res.text()
    }
    return {
      data,
      status: res.status,
      headers: Object.fromEntries([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(res.headers as unknown as any).entries()
      ]),
      url: res.url
    }
  })
}

export function post<ReturnType extends GetOption["responseType"] | undefined>(
  options: Omit<PostOption, "responseType"> & {
    responseType?: ReturnType
  }
): Promise<Response<ReturnType>> {
  return fetch(options.url, {
    method: "post",
    headers: options.headers
  }).then(async (res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, functional/no-let
    let data: any
    switch (options.responseType) {
      case "arraybuffer":
        data = await res.arrayBuffer()
        break
      case "json":
        data = JSON.parse(await res.text())
        break
      default:
        data = await res.text()
    }
    return {
      data,
      status: res.status,
      headers: Object.fromEntries([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(res.headers as unknown as any).entries()
      ]),
      url: res.url
    }
  })
}

// eslint-disable-next-line no-redeclare, no-import-assign
const AppInfo: AppInfo = {
  mode: "spa",
  extension: false,
  native: false,
  standalone: false,
  version: "0.0.1"
}

// eslint-disable-next-line functional/immutable-data, @typescript-eslint/no-empty-function
Object.assign(self, { parseDom, get, post, setReferrers: () => {}, AppInfo })

// eslint-disable-next-line @typescript-eslint/ban-types
export function expectFile(name: string, fn: Function) {
  const [txt, json] = [
    readFileSync(
      join(__dirname, "../src/fetch/__test__/assets/", name + ".txt"),
      "utf8"
    ),
    readFileSync(
      join(__dirname, "../src/fetch/__test__/assets/", name + ".json"),
      "utf8"
    )
  ]

  expect(fn(txt)).toEqual(JSON.parse(json))
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function writeTest(name: string, fn: Function) {
  const txt = readFileSync(
    join(__dirname, "../src/fetch/__test__/assets/", name + ".txt"),
    "utf8"
  )

  writeFileSync(
    join(__dirname, "../src/fetch/__test__/assets/", name + ".json"),
    JSON.stringify(fn(txt))
  )
}

import {
  type API,
  defineApi,
  type ID,
  type Ranking,
  type Server
} from "raiku-pgs/plugin"

const Rankings: Ranking[] = []
const Servers: Server[] = []

class Plugin implements API {
  public readonly Rankings = Rankings
  public readonly Servers = Servers

  // eslint-disable-next-line @typescript-eslint/require-await
  async setup() {}

  async index() {}

  async getComic(zlug: string) {}

  async getComicChapter<Fast extends boolean>(
    mangaId: ID,
    epId: ID,
    fast: Fast
  ) {}

  async getComicComments(
    comicId: number,
    orderByNews: boolean,
    chapterId = -1,
    parentId = 0,
    page: number,
    comicKey: string
  ) {}

  async getListChapters(mangaId: ID) {}

  async searchQuickly(keyword: string, page: number) {}

  async search(keyword: string, page: number) {}

  async getRanking(
    type: string,
    page: number,
    filter: Record<string, string>
  ) {}

  async getCategory(
    type: string,
    page: number,
    filter: Record<string, string | string[]>
  ) {}
}

defineApi(Plugin)

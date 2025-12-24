import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Blog section with categories and authors
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem()
                .title("All Blogs")
                .child(S.documentTypeList("blog").title("All Blogs")),
              S.listItem()
                .title("Blog Categories")
                .child(S.documentTypeList("category").title("Blog Categories")),
              S.listItem()
                .title("Authors")
                .child(S.documentTypeList("author").title("Authors")),
            ])
        ),
      S.divider(),
      // People section with members and teams
      S.listItem()
        .title("People")
        .child(
          S.list()
            .title("People")
            .items([
              S.listItem()
                .title("Members")
                .child(S.documentTypeList("member").title("Members")),
              S.listItem()
                .title("Teams")
                .child(S.documentTypeList("team").title("Teams")),
            ])
        ),
      S.divider(),
      // Other document types
      ...S.documentTypeListItems().filter(
        (item) =>
          !["blog", "category", "author", "member", "team"].includes(
            item.getId() ?? ""
          )
      ),
    ]);

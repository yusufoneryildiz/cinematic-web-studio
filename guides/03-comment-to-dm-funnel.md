# Comment -> DM funnel

```
Reel  ->  caption: Comment "SOURCE"  ->  automatic DM with your link  ->  sales page  ->  checkout
```

- **No-code:** ManyChat (Instagram automation) — trigger "comment contains SOURCE" -> send DM with link.
- **Self-hosted / free:** an n8n workflow listening to the Instagram Graph API `comments` webhook and
  replying with a private reply (`recipient: { comment_id }`). A complete open-source version (DM
  assistant + comment -> DM branch):
  https://github.com/yusufoneryildiz/instagram-ai-dm-asistani

Rules that keep the account safe:
- Only reply to people who commented or messaged you first (the API enforces this anyway).
- One DM per comment, no follow-up spam.
- Put the same link in your bio for people who don't comment.

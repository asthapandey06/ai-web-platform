# Webhooks Skill

## Rules

- Verify webhook authenticity.
- Validate payloads.
- Make processing idempotent.
- Acknowledge quickly when appropriate.
- Move slow processing to a queue when required.
- Record event identity where duplicate delivery is possible.
- Log failures and provide retry/recovery behavior.
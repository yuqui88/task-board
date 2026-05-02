# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git 運用ルール

コードを変更するたびに、以下の手順で GitHub にプッシュすること。

```bash
git add <変更ファイル>
git commit -m "説明的なコミットメッセージ"
git push origin <ブランチ名>
```

- コミットメッセージは変更内容が明確にわかるように記述する
- `git add .` や `git add -A` は避け、変更ファイルを明示的に指定する
- 機密情報（APIキー、トークン等）を含むファイルは絶対にコミットしない
- `main` / `master` への force push は行わない

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**quiz-app** — HTML/CSS/JavaScript で構築する一般常識クイズアプリ。
ビルドツール・フレームワーク不使用。`index.html` をブラウザで直接開くか、ローカルサーバーで起動する。

## 起動方法

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .
```

## ファイル構成と役割

| ファイル | 役割 |
|---|---|
| `index.html` | DOM 構造のみ。ロジックは持たない |
| `style.css` | CSS 変数（`:root`）でカラーパレット・角丸・シャドウを一元管理 |
| `script.js` | 問題データ・状態管理・画面遷移をすべて担う |

## アーキテクチャ

`script.js` はシングルファイルで完結するシンプルな状態機械。

- **データ**: `questions` 配列（各要素に `text / choices / answer / explanation`）
- **状態**: `currentIndex`（現在の問題番号）と `score`（正解数）のみ
- **画面遷移**: `#quiz-screen` と `#result-screen` の `hidden` 属性を切り替えるだけ
- **フロー**: `startQuiz → showQuestion → handleAnswer → nextQuestion|showResult`

問題を追加・変更する場合は `questions` 配列を編集するだけでよい。
`answer` は `choices` 配列の 0 始まりインデックス。

## デザイン方針

- CSS 変数（`--color-primary` / `--color-correct` / `--color-wrong` 等）を変更するだけでテーマを調整できる
- 正解は緑（`.correct`）、不正解は赤（`.wrong`）でボタンを色分け
- `aria-live="polite"` をフィードバック領域に付与してアクセシビリティを確保

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

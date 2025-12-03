# AI Agent Guide - Project Context & Rules

このファイルは、本プロジェクト（AI Agent System MVP）で作業を行うAIエージェントのためのガイドラインです。
作業を開始する際は、必ずこのファイルと `REQUIREMENTS.md`、`TASK.md` を参照してください。

## 1. プロジェクトの核心

**目標**: Amazon Bedrock AgentCore上で動作する、最小限かつ機能するAIエージェントシステムを構築する。

**重要方針**:
*   **Keep It Simple**: MVP（Minimum Viable Product）であることを常に意識する。過剰な機能や複雑な抽象化は避ける。
*   **Local First**: まずローカル環境（`localhost`）で完璧に動作させることを最優先する。デプロイはその次。
*   **Standard Patterns**: LangChain/LangGraph、Next.jsの標準的な実装パターンに従う。奇抜な独自実装は避ける。

## 2. 技術スタックと制約

### フロントエンド
*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **State**: React Hooks (useState, useEffect)
*   **Communication**: Axios (REST API)

### バックエンド
*   **Language**: Python 3.10+
*   **Web Framework**: FastAPI
*   **Agent Framework**: LangGraph, langchain-aws
*   **AWS SDK**: boto3
*   **LLM**: Amazon Bedrock (GPT-OSS-120B)

### インフラ・環境
*   **Runtime**: AgentCore Runtime (最終デプロイ先)
*   **Auth**: ローカルは認証なし。AWS認証は `~/.aws/credentials` または環境変数を使用。
*   **Storage**: メモリ内のみ（MVPではDBなし）。

## 3. ディレクトリ構造のメンタルモデル

```
ai-agents-bedrock/
├── backend/                # Pythonロジックの全て
│   ├── app.py              # エントリーポイント (FastAPI)
│   ├── agent/              # エージェントの頭脳
│   │   ├── core.py         # LangGraphのグラフ定義
│   │   └── agentcore_wrapper.py # デプロイ用ラッパー
│   └── requirements.txt    # 依存関係
└── frontend/               # UIの全て
    └── src/app/page.tsx    # メインチャット画面
```

## 4. 作業ルール

1.  **コンテキストの確認**:
    *   仕様の詳細は `REQUIREMENTS.md` にある。
    *   現在の進捗と次のタスクは `TASK.md` にある。
    *   作業前には必ずこれらを確認し、矛盾する実装を行わないこと。

2.  **コード変更の原則**:
    *   既存のコードを壊さない。
    *   新しいファイルを作成する場合は、`REQUIREMENTS.md` のディレクトリ構成に従う。
    *   エラーハンドリングを必ず入れる（特にAWS API呼び出し部分）。

3.  **検証**:
    *   コードを書いたら、必ず「どうやって検証するか」を考える。
    *   「バックエンド起動」「フロントエンド起動」「疎通確認」の3ステップを意識する。

4.  **行き詰まったら**:
    *   `REQUIREMENTS.md` の「トラブルシューティング」や「リスクと対策」を確認する。
    *   基本に立ち返り、最小構成で動くかどうかを試す。

## 5. 重要なコマンド（AI用メモ）

*   **バックエンド起動**: `cd backend && python app.py`
*   **フロントエンド起動**: `cd frontend && npm run dev`
*   **テスト実行**: `pytest backend/tests/`
*   **AgentCoreデプロイ**: `cd backend && agentcore launch`

---
**合言葉**: "Simple, Local, Working."

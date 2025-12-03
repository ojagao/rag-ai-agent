# AI Agent System - Minimum Viable Product Requirements

## 1. プロジェクト概要

### 1.1 目的
Amazon Bedrock AgentCore上で動作する、最小限のAIエージェントシステムを構築する。
LangChain/LangGraphを使用してエージェントロジックを実装し、シンプルなWebフロントエンドから対話可能な状態を実現する。

### 1.2 開発方針
- **段階的開発**: まず動作する最小構成を作成する
- **ローカルファースト**: AgentCoreデプロイ前にローカルで動作確認
- **フレームワーク活用**: LangChain/LangGraphで標準的なパターンを使用

---

## 2. システム構成

### 2.1 アーキテクチャ図
```
┌─────────────────┐
│  Frontend       │  ← Next.js (ローカル起動)
│  (Next.js)      │     React チャットUI
└────────┬────────┘
         │ HTTP/WebSocket
         ↓
┌─────────────────┐
│  Agent Logic    │  ← LangChain/LangGraph
│  (Python)       │     会話ロジック
└────────┬────────┘
         │ Boto3
         ↓
┌─────────────────┐
│  Amazon Bedrock │  ← GPT-OSS-120B
│  (LLM)          │     基盤モデル
└─────────────────┘

【デプロイ後】
Next.js Frontend → AgentCore Runtime (コンテナ) → Bedrock
```

### 2.2 技術スタック

| レイヤー | 技術 | 理由 |
|---------|------|------|
| **フロントエンド** | Next.js (React) | モダンなUI/UX、本番環境対応、TypeScript対応 |
| **エージェント** | LangGraph + langchain-aws | ステートフルな会話フロー、Bedrock統合 |
| **LLM** | Amazon Bedrock (GPT-OSS-120B) | API Key不要、AWS統合課金、オープンソースモデル |
| **実行環境** | AgentCore Runtime | マネージド実行環境、セッション管理 |

---

## 3. 機能要件（MVP）

### 3.1 必須機能

#### F-1: シンプルなチャットインターフェース
- **説明**: ブラウザでアクセス可能なチャットUI
- **要件**:
  - テキスト入力フィールド
  - 送信ボタン
  - 会話履歴の表示（ユーザー/アシスタント）
  - セッションクリア機能
  - レスポンシブデザイン
- **実装**: Next.js (React) + Tailwind CSS

#### F-2: LLMとの基本的な対話
- **説明**: ユーザー入力をLLMに送信し、応答を表示
- **要件**:
  - Amazon Bedrock GPT-OSS-120Bモデルを使用
  - 会話履歴を保持（セッション内のみ）
  - 応答時間: 5秒以内（通常ケース）
- **実装**: `ChatBedrock` + `ConversationBufferMemory`

#### F-3: ローカル実行
- **説明**: AgentCoreデプロイ前にローカルで動作確認
- **要件**:
  - フロントエンド: `npm run dev` で起動（http://localhost:3000）
  - バックエンド: `python app.py` で起動（http://localhost:8000）
  - AWS認証情報（`~/.aws/credentials`）のみで動作
- **実装**: Next.js Dev Server + FastAPI/Flask

#### F-4: AgentCoreへのデプロイ
- **説明**: 本番環境への簡単なデプロイ
- **要件**:
  - `agentcore configure` + `agentcore launch` でデプロイ完了
  - デプロイ後も同じチャット機能が動作
  - セッション管理が自動で有効化
- **実装**: `BedrockAgentCoreApp` ラッパー

---

## 4. 非機能要件

### 4.1 パフォーマンス
- **応答時間**: 通常のチャット応答は5秒以内
- **同時接続**: ローカル実行では1ユーザー（MVP）

### 4.2 セキュリティ
- **認証**: ローカル実行時は認証なし
- **AWS権限**: Bedrock InvokeModel権限のみ必要
- **データ保存**: 会話履歴はメモリ内のみ（永続化なし）

### 4.3 可用性
- **稼働要件**: 開発環境での動作確認が目的
- **エラーハンドリング**: 基本的なエラーメッセージ表示

### 4.4 保守性
- **コード構成**: シンプルなモジュール構造
- **依存関係**: `requirements.txt` で明示
- **ドキュメント**: README.md に起動手順を記載

---

## 5. システム要件

### 5.1 開発環境
- **OS**: macOS / Linux / Windows (WSL2)
- **Python**: 3.10以上
- **AWS CLI**: 2.0以上（設定済み）
- **必要なAWS権限**:
  - `bedrock:InvokeModel`

### 5.2 事前準備
1. **Bedrockモデルアクセス有効化**:
   - AWSコンソール → Amazon Bedrock → Model access
   - GPT-OSS-120B (openai.gpt-oss-120b-1:0) を有効化（初回呼び出し時に自動有効化）
2. **AWS認証情報設定**:
   ```bash
   aws configure
   # または
   aws configure sso --profile sandbox
   ```
3. **開発環境構築**:
   ```bash
   # Python仮想環境
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate

   # Node.js (v22以上推奨)
   node --version  # v22以上を確認
   npm --version
   ```

---

## 6. ディレクトリ構成

```
ai-agents-bedrock/
├── REQUIREMENTS.md          # 本ドキュメント
├── README.md                # セットアップ・起動手順・デプロイ手順
├── .env.example            # 環境変数テンプレート
│
├── backend/                 # Pythonバックエンド
│   ├── requirements.txt    # Python依存関係
│   ├── app.py              # FastAPI/Flaskアプリ
│   ├── agent/
│   │   ├── __init__.py
│   │   ├── core.py         # LangGraphエージェントロジック
│   │   ├── config.py       # 設定（モデルID等）
│   │   └── agentcore_wrapper.py  # AgentCoreデプロイ用
│   └── tests/
│       └── test_agent.py   # 基本的なテスト
│
└── frontend/                # Next.jsフロントエンド
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx    # メインチャット画面
    │   │   └── layout.tsx
    │   ├── components/
    │   │   ├── ChatMessage.tsx
    │   │   ├── ChatInput.tsx
    │   │   └── ChatContainer.tsx
    │   └── lib/
    │       └── api.ts      # バックエンドAPI呼び出し
    └── public/
```

---

## 7. 実装仕様

### 7.1 使用するライブラリ

#### バックエンド (Python)
```txt
# backend/requirements.txt
fastapi>=0.109.0           # WebAPIフレームワーク
uvicorn>=0.27.0            # ASGIサーバー
langchain-aws>=0.1.0       # Bedrock統合
langgraph>=0.1.0          # ステートフルエージェント
boto3>=1.34.0             # AWS SDK
python-dotenv>=1.0.0      # 環境変数管理
pydantic>=2.0.0           # データバリデーション
```

#### フロントエンド (Next.js)
```json
// frontend/package.json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### 7.2 環境変数

```bash
# .env (プロジェクトルート)
AWS_REGION=ap-northeast-1
AWS_PROFILE=sandbox-only-aso  # オプション
BEDROCK_MODEL_ID=openai.gpt-oss-120b-1:0
BACKEND_URL=http://localhost:8000  # フロントエンド用
```

### 7.3 バックエンドAPI（FastAPI）

```python
# backend/app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent.core import create_agent
import os

app = FastAPI()

# CORS設定（Next.js用）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# エージェント初期化
agent = create_agent(
    model_id=os.getenv("BEDROCK_MODEL_ID"),
    region=os.getenv("AWS_REGION")
)

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []

class ChatResponse(BaseModel):
    response: str

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        messages = request.history + [{"role": "user", "content": request.message}]
        result = agent.invoke({"messages": messages})
        return ChatResponse(response=result["messages"][-1].content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### 7.4 エージェントロジック（LangGraph）

```python
# backend/agent/core.py
from langchain_aws import ChatBedrock
from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages

class State(TypedDict):
    messages: Annotated[list, add_messages]

def create_agent(model_id: str, region: str):
    llm = ChatBedrock(
        model_id=model_id,
        region_name=region,
        model_kwargs={"temperature": 0.7, "max_tokens": 2048}
    )

    def chatbot(state: State):
        return {"messages": [llm.invoke(state["messages"])]}

    graph = StateGraph(State)
    graph.add_node("chatbot", chatbot)
    graph.add_edge(START, "chatbot")
    graph.add_edge("chatbot", END)

    return graph.compile()
```

### 7.5 フロントエンド（Next.js）

```typescript
// frontend/src/app/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/chat', {
        message: input,
        history: messages,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Agent Chat (MVP)</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-100 ml-auto max-w-md'
                : 'bg-gray-100 mr-auto max-w-md'
            }`}
          >
            <p className="font-semibold">{msg.role === 'user' ? 'You' : 'AI'}</p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 p-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {loading ? '送信中...' : '送信'}
        </button>
      </form>
    </main>
  );
}
```

---

## 8. テスト要件

### 8.1 動作確認項目

| ID | テスト項目 | 確認方法 |
|----|----------|---------|
| T-1 | バックエンド起動 | `python backend/app.py` で起動できること |
| T-2 | フロントエンド起動 | `npm run dev` (frontend/) で起動できること |
| T-3 | UI表示 | ブラウザでチャット画面が表示されること |
| T-4 | LLM応答 | 「こんにちは」と入力して応答が返ること |
| T-5 | 会話継続 | 前の会話を踏まえた応答が返ること |
| T-6 | エラーハンドリング | AWS認証エラー時に適切なメッセージが表示されること |

### 8.2 単体テスト

```python
# backend/tests/test_agent.py
import pytest
from agent.core import create_agent

def test_agent_creation():
    agent = create_agent(
        model_id="openai.gpt-oss-120b-1:0",
        region="ap-northeast-1"
    )
    assert agent is not None

def test_agent_invoke():
    agent = create_agent(
        model_id="openai.gpt-oss-120b-1:0",
        region="ap-northeast-1"
    )
    result = agent.invoke({
        "messages": [{"role": "user", "content": "Hello"}]
    })
    assert "messages" in result
    assert len(result["messages"]) > 0
```

---

## 9. デプロイ仕様（AgentCore）

### 9.1 AgentCore対応版の追加

```python
# backend/agent/agentcore_wrapper.py
from bedrock_agentcore import BedrockAgentCoreApp
from agent.core import create_agent
import os

app = BedrockAgentCoreApp()
agent = create_agent(
    model_id=os.getenv("BEDROCK_MODEL_ID", "openai.gpt-oss-120b-1:0"),
    region=os.getenv("AWS_REGION", "ap-northeast-1")
)

@app.entrypoint
def invoke(payload, context):
    user_message = payload.get("prompt", "")

    # セッションIDの取得
    session_id = getattr(context, 'session_id', 'default')

    # エージェント実行
    result = agent.invoke({
        "messages": [{"role": "user", "content": user_message}]
    })

    return {
        "response": result["messages"][-1].content,
        "session_id": session_id
    }

if __name__ == "__main__":
    app.run()
```

### 9.2 デプロイコマンド

```bash
# バックエンドディレクトリで実行
cd backend

# 1. 設定
agentcore configure \
  --entrypoint agent/agentcore_wrapper.py \
  --requirements-file requirements.txt \
  --non-interactive

# 2. デプロイ
agentcore launch

# 3. テスト
agentcore invoke '{"prompt": "こんにちは"}'
```

---

## 10. 成功基準

### 10.1 MVP完成の定義
- [ ] バックエンドがローカルで起動する (`python backend/app.py`)
- [ ] フロントエンドがローカルで起動する (`npm run dev`)
- [ ] ブラウザでチャットUIが表示される
- [ ] LLMとの基本的な対話ができる
- [ ] 会話履歴が保持される（セッション内）
- [ ] AgentCoreへデプロイできる
- [ ] デプロイ後も同じ機能が動作する

### 10.2 コード品質基準
- [ ] 単体テストが全て合格
- [ ] README.mdにローカル起動手順が記載されている
- [ ] README.mdにAgentCoreデプロイ手順が記載されている
- [ ] 環境変数が`.env.example`で明示されている
- [ ] エラー発生時に適切なメッセージが表示される

---

## 11. 参考資料

### 11.1 公式ドキュメント
- [LangChain AWS Integration](https://python.langchain.com/docs/integrations/chat/bedrock/)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

### 11.2 サンプルコード
- [AgentCore Quickstart](https://github.com/aws/bedrock-agentcore-starter-toolkit)
- [LangChain Bedrock Examples](https://github.com/aws-samples/amazon-bedrock-claude-2-and-3-with-langchain-popular-use-cases)

---

## 12. リスクと対策

| リスク | 影響 | 対策 |
|-------|------|------|
| Bedrockモデルアクセス未有効化 | 起動時エラー | README.mdに事前チェック手順を記載 |
| AWS認証情報未設定 | boto3エラー | 起動時に認証状態をチェック |
| 依存ライブラリの競合 | インストールエラー | 仮想環境必須とする |
| AgentCoreデプロイ失敗 | デプロイ不可 | ローカル実行で先に動作確認 |

---

## 13. 次のアクション

1. 本REQUIREMENTS.mdをレビュー
2. ディレクトリ構造の作成（backend/ と frontend/）
3. バックエンド実装（FastAPI + LangGraph）
4. フロントエンド実装（Next.js + React）
5. **README.md作成（重要）**:
   - ローカル起動手順（バックエンド・フロントエンド両方）
   - AgentCoreデプロイ手順
   - 環境変数設定方法
   - トラブルシューティング
6. AgentCoreへのデプロイ
7. 動作確認とドキュメント更新

---

## 付録A: 環境変数一覧

| 変数名 | 必須 | デフォルト値 | 説明 |
|-------|------|-------------|------|
| `AWS_REGION` | Yes | ap-northeast-1 | Bedrockリージョン |
| `AWS_PROFILE` | No | sandbox-only-aso | AWS CLIプロファイル |
| `BEDROCK_MODEL_ID` | Yes | openai.gpt-oss-120b-1:0 | GPT-OSS-120B モデルID |
| `BACKEND_URL` | No | http://localhost:8000 | フロントエンド用バックエンドURL |

---
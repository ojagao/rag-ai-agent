# AI Agent System (MVP)

Amazon Bedrock AgentCore上で動作する、最小限のAIエージェントシステムです。
LangGraphを使用したエージェントロジックと、Next.jsによるチャットUIを提供します。

## システム要件

- **Python**: 3.10以上
- **Node.js**: v18以上
- **AWS CLI**: 設定済みであること
- **Amazon Bedrock**: `openai.gpt-oss-120b-1:0` モデルのアクセスが有効化されていること

## セットアップ手順

### 1. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成します（`.env.example` をコピー）。

```bash
cp .env.example .env
```

`.env` の内容を確認・修正します：
```bash
AWS_REGION=ap-northeast-1
AWS_PROFILE=sandbox-only-aso  # 必要に応じて変更
BEDROCK_MODEL_ID=openai.gpt-oss-120b-1:0
BACKEND_URL=http://localhost:8001
```

### 2. バックエンド (Python) の起動

```bash
# 仮想環境の作成と有効化
python3.11 -m venv .venv
source .venv/bin/activate

# 依存関係のインストール
pip install -r backend/requirements.txt

# サーバー起動 (ポート 8001)
cd backend
python app.py
```
バックエンドは `http://localhost:8001` で起動します。
ヘルスチェック: `http://localhost:8001/health`

### 3. フロントエンド (Next.js) の起動

別のターミナルを開いて実行してください。

```bash
cd frontend

# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```
フロントエンドは通常 `http://localhost:3000` (または 3001) で起動します。
ブラウザでアクセスしてチャットを開始してください。

## AgentCoreへのデプロイ

本番環境（AgentCore）へのデプロイ手順です。

1.  **AgentCore CLIのインストール**
    ```bash
    pip install bedrock-agentcore-starter-toolkit
    ```

2.  **設定とデプロイ**
    ```bash
    cd backend
    agentcore configure \
      --entrypoint agent/agentcore_wrapper.py \
      --requirements-file requirements.txt \
      --non-interactive

    agentcore launch
    ```

3.  **動作確認**
    ```bash
    agentcore invoke '{"prompt": "こんにちは"}'
    ```

## トラブルシューティング

- **Backend Port Error**: ポート8001が使用中の場合、`backend/app.py` のポート番号を変更し、`.env` と `frontend/app/page.tsx` も合わせて更新してください。
- **AWS Error**: `AWS_PROFILE` やリージョン設定を確認してください。`aws sts get-caller-identity` で認証情報を確認できます。
- **Module Not Found**: 仮想環境 (`.venv`) が有効になっているか確認してください。

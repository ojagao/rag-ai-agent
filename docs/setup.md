# ローカル環境起動手順書

このプロジェクトをローカル環境で実行するための手順です。

## 1. 事前準備

以下のツールがインストールされていることを確認してください。
- **Python**: 3.10 以上
- **Node.js**: v18 以上
- **AWS CLI**: 設定済みであること (`aws configure`)

また、プロジェクトルートに `.env` ファイルが存在し、以下の設定が正しいことを確認してください。
```bash
AWS_REGION=ap-northeast-1
AWS_PROFILE=sandbox-only-aso  # ご自身のプロファイルに合わせて変更
BEDROCK_MODEL_ID=openai.gpt-oss-120b-1:0
BACKEND_URL=http://localhost:8001
```

## 2. バックエンドの起動

ターミナルを開き、以下のコマンドを実行します。

```bash
# 1. 仮想環境の有効化
source .venv/bin/activate

# 2. 依存関係のインストール（初回のみ、または変更時）
pip install -r backend/requirements.txt

# 3. サーバー起動
cd backend
python app.py
```
起動成功すると、`http://0.0.0.0:8001` でリッスン開始した旨のログが表示されます。

## 3. フロントエンドの起動

**新しいターミナル**を開き、以下のコマンドを実行します。

```bash
cd frontend

# 1. 依存関係のインストール（初回のみ、または変更時）
npm install

# 2. 開発サーバー起動
npm run dev
```
起動成功すると、`http://localhost:3000` でアクセス可能になります。

## 4. 動作確認

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。
チャット画面が表示され、AIと対話ができれば起動完了です。

## 5. 終了方法

それぞれのターミナルで `Ctrl + C` を押してサーバーを停止してください。

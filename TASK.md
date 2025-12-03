# AI Agent System - 実装タスク管理

## フェーズ1: 環境構築と事前準備

### 1.1 Bedrock モデルアクセス有効化
- [x] AWSコンソール → Amazon Bedrock → Model access
- [x] GPT-OSS-120B (openai.gpt-oss-120b-1:0) を有効化

### 1.2 開発環境セットアップ
- [x] Python 3.10以上のインストール確認
- [x] Node.js v18以上のインストール確認
- [x] Python仮想環境の作成と有効化
  ```bash
  python -m venv .venv
  source .venv/bin/activate  # Windows: .venv\Scripts\activate
  ```

---

## フェーズ2: プロジェクト構造の作成

### 2.1 ディレクトリ構造
- [x] プロジェクトルートディレクトリ構造を作成（REQUIREMENTS.md セクション6参照）
  ```bash
  mkdir -p backend/agent backend/tests
  mkdir -p frontend/src/app frontend/src/components frontend/src/lib frontend/public
  ```

### 2.2 設定ファイル
- [x] `.env.example` を作成（REQUIREMENTS.md セクション7.2参照）
- [x] `.env` ファイルを作成（`.env.example`をコピーして環境変数を設定）
- [x] `.gitignore` を作成
  ```
  .env
  .venv/
  __pycache__/
  node_modules/
  .next/
  .bedrock_agentcore.yaml
  ```

---

## フェーズ3: バックエンド実装

### 3.1 依存関係のインストール
- [x] `backend/requirements.txt` を作成（REQUIREMENTS.md セクション7.1参照）
- [x] Pythonパッケージをインストール
  ```bash
  cd backend
  pip install -r requirements.txt
  ```

### 3.2 エージェントロジック実装
- [x] `backend/agent/__init__.py` を作成（空ファイル）
- [x] `backend/agent/config.py` を作成
  - 環境変数の読み込み
  - モデルID、リージョンの設定
- [x] `backend/agent/core.py` を実装（REQUIREMENTS.md セクション7.4参照）
  - LangGraphエージェントの作成
  - ChatBedrock統合

### 3.3 FastAPI実装
- [x] `backend/app.py` を実装（REQUIREMENTS.md セクション7.3参照）
  - FastAPIアプリケーション作成
  - CORS設定
  - `/api/chat` エンドポイント実装
  - `/health` エンドポイント実装

### 3.4 テスト実装
- [x] `backend/tests/__init__.py` を作成（空ファイル）
- [x] `backend/tests/test_agent.py` を実装（REQUIREMENTS.md セクション8.2参照）
- [x] テストを実行して確認
  ```bash
  pytest backend/tests/
  ```

---

## フェーズ4: フロントエンド実装

### 4.1 Next.jsプロジェクト初期化
- [x] Next.jsプロジェクトを作成
  ```bash
  cd frontend
  npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
  ```
- [x] 不要なファイルを削除し、REQUIREMENTS.md セクション6のディレクトリ構造に調整

### 4.2 依存関係のインストール
- [x] `axios` をインストール
  ```bash
  npm install axios
  ```

### 4.3 チャットUI実装
- [x] `frontend/src/app/page.tsx` を実装（REQUIREMENTS.md セクション7.5参照）
  - チャット画面のメインコンポーネント
  - メッセージ送信機能
  - バックエンドAPI呼び出し
- [x] `frontend/src/app/layout.tsx` を調整（必要に応じて）
- [x] Tailwind CSSスタイリングの調整

### 4.4 コンポーネント分割（オプション）
- [x] `frontend/src/components/ChatMessage.tsx` - メッセージ表示コンポーネント
- [x] `frontend/src/components/ChatInput.tsx` - 入力フォームコンポーネント
- [x] `frontend/src/components/ChatContainer.tsx` - チャット全体のコンテナ

### 4.5 スタイリング（ダークモード）
- [x] ダークモードスタイルの適用（黒/グレー背景、白文字）

---

## フェーズ5: ローカル動作確認

### 5.1 バックエンド起動
- [x] バックエンドサーバーを起動
  ```bash
  cd backend
  python app.py
  ```
- [x] ブラウザまたはcurlで `/health` エンドポイントを確認
  ```bash
  curl http://localhost:8000/health
  ```

### 5.2 フロントエンド起動
- [x] フロントエンドサーバーを起動
  ```bash
  cd frontend
  npm run dev
  ```
- [x] ブラウザで `http://localhost:3000` にアクセス

### 5.3 統合テスト（REQUIREMENTS.md セクション8.1参照）
- [x] T-1: バックエンド起動確認
- [x] T-2: フロントエンド起動確認
- [x] T-3: UI表示確認
- [x] T-4: LLM応答確認（「こんにちは」と入力）
- [x] T-5: 会話継続確認（前の会話を踏まえた応答）
- [x] T-6: エラーハンドリング確認

---

## フェーズ6: ドキュメント作成

### 6.1 README.md作成（必須）
- [x] プロジェクト概要
- [x] システム要件
- [x] **ローカル起動手順**
  - [x] 環境変数設定方法
  - [x] バックエンド起動手順
  - [x] フロントエンド起動手順
- [x] **AgentCoreデプロイ手順**（REQUIREMENTS.md セクション9.2参照）
  - [x] `agentcore configure` コマンド
  - [x] `agentcore launch` コマンド
  - [x] デプロイ後のテスト方法
- [x] トラブルシューティング
  - [x] よくあるエラーと対処法
  - [x] AWS認証エラー
  - [x] Bedrockモデルアクセスエラー

---

## フェーズ7: AgentCoreデプロイ

### 7.1 AgentCore対応版の作成
- [ ] `backend/agent/agentcore_wrapper.py` を実装（REQUIREMENTS.md セクション9.1参照）
  - BedrockAgentCoreApp統合
  - エントリーポイント実装

### 7.2 AgentCore設定とデプロイ
- [ ] AgentCore CLIのインストール
  ```bash
  pip install bedrock-agentcore-starter-toolkit
  ```
- [ ] AgentCoreの設定
  ```bash
  cd backend
  agentcore configure \
    --entrypoint agent/agentcore_wrapper.py \
    --requirements-file requirements.txt \
    --non-interactive
  ```
- [ ] AgentCoreへデプロイ
  ```bash
  agentcore launch
  ```

### 7.3 デプロイ後の確認
- [ ] `agentcore status` でステータス確認
- [ ] `agentcore invoke '{"prompt": "こんにちは"}'` でテスト実行
- [ ] AgentCore環境で正常に応答が返ることを確認

---

## フェーズ8: 最終確認と納品

### 8.1 成功基準の確認（REQUIREMENTS.md セクション10参照）

#### MVP完成の定義
- [ ] バックエンドがローカルで起動する
- [ ] フロントエンドがローカルで起動する
- [ ] ブラウザでチャットUIが表示される
- [ ] LLMとの基本的な対話ができる
- [ ] 会話履歴が保持される（セッション内）
- [ ] AgentCoreへデプロイできる
- [ ] デプロイ後も同じ機能が動作する

#### コード品質基準
- [ ] 単体テストが全て合格
- [ ] README.mdにローカル起動手順が記載されている
- [ ] README.mdにAgentCoreデプロイ手順が記載されている
- [ ] 環境変数が`.env.example`で明示されている
- [ ] エラー発生時に適切なメッセージが表示される

### 8.2 コードレビューとクリーンアップ
- [ ] 不要なコメントやデバッグコードの削除
- [ ] コードフォーマットの統一
- [ ] 環境変数の確認（`.env`がgitにコミットされていないこと）
- [ ] `.gitignore`の確認

### 8.3 納品準備
- [ ] 全てのドキュメントが最新であることを確認
- [ ] リポジトリのクリーンアップ
- [ ] 最終動作確認（ローカル・AgentCore両方）

---

## 付録: トラブルシューティングチェックリスト

### バックエンド起動エラー
- [ ] Python仮想環境が有効化されているか確認
- [ ] `requirements.txt` のパッケージが全てインストールされているか確認
- [ ] `.env` ファイルが存在し、正しい環境変数が設定されているか確認
- [ ] AWS認証情報が設定されているか確認（`aws sts get-caller-identity`）

### フロントエンド起動エラー
- [ ] Node.js v22以上がインストールされているか確認
- [ ] `npm install` が実行されているか確認
- [ ] バックエンドが起動しているか確認（http://localhost:8000/health）

### LLM応答エラー
- [ ] Bedrockモデルアクセスが有効化されているか確認
- [ ] `BEDROCK_MODEL_ID` が正しいか確認
- [ ] AWS認証情報に `bedrock:InvokeModel` 権限があるか確認
- [ ] リージョンが正しいか確認（`AWS_REGION`）

### AgentCoreデプロイエラー
- [ ] `bedrock-agentcore-starter-toolkit` がインストールされているか確認
- [ ] `agentcore configure` が正常に完了したか確認
- [ ] IAMロールに必要な権限があるか確認
- [ ] ECRリポジトリが作成されているか確認（または自動作成設定）

---

## 進捗管理

### 開始日
- 開始日: ___________

### マイルストーン
- [ ] フェーズ1完了: ___________
- [ ] フェーズ2完了: ___________
- [ ] フェーズ3完了: ___________
- [ ] フェーズ4完了: ___________
- [ ] フェーズ5完了: ___________
- [ ] フェーズ6完了: ___________
- [ ] フェーズ7完了: ___________
- [ ] フェーズ8完了（プロジェクト完了）: ___________

### メモ・課題
```
[ここに気づいた点、課題、次回対応事項などを記載]
```

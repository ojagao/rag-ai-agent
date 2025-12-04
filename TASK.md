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
- [x] `backend/agent/agentcore_wrapper.py` を実装
  - BedrockAgentCoreApp統合
  - エントリーポイント実装

### 7.2 AgentCore設定
- [x] AgentCore CLIのインストール
  ```bash
  pip install bedrock-agentcore-starter-toolkit
  ```
- [x] AgentCoreの設定
  ```bash
  cd backend
  agentcore configure
  ```
- [ ] IAM権限の修正（`AccessDeniedException` 解決）
  - `bedrock:CreateAgentRuntime` 権限を追加
  - `sandbox-only-aso` プロファイルに適用

### 7.3 AgentCoreデプロイ（保留中）
- [ ] IAM権限修正後、デプロイを実行
  ```bash
  agentcore launch
  ```
- [ ] `agentcore status` でステータス確認
- [ ] `agentcore invoke` でテスト実行

---

## フェーズ8: MVP完成（✅ 完了）

### 8.1 成功基準の確認
- [x] バックエンドがローカルで起動する
- [x] フロントエンドがローカルで起動する
- [x] ブラウザでチャットUIが表示される
- [x] LLMとの基本的な対話ができる
- [x] 会話履歴が保持される（セッション内）
- [x] Markdownレンダリング（テーブル、リスト対応）
- [x] LangSmith統合（トレーシング）

### 8.2 コード品質
- [x] コードのクリーンアップ完了
- [x] README.md作成
- [x] LOCAL_SETUP.md作成
- [x] 環境変数の適切な管理（`.env`, `.env.example`）
- [x] `.gitignore`の設定

### 8.3 バージョン管理
- [x] GitHubリポジトリに紐づけ
- [x] 初回コミット・プッシュ完了
- [x] リポジトリURL: https://github.com/ojagao/rag-ai-agent

---

## フェーズ9: RAG機能の実装（S3 Vectors + Bedrock KB）

### 9.1 アーキテクチャ設計
- [ ] RAGアーキテクチャの確定
  ```
  管理画面（Next.js）
    ↓ テキスト編集・追加
  S3バケット（元データ）
    ↓ S3イベント通知
  Lambda関数（自動ベクター化トリガー）
    ↓ Bedrock KB 同期
  S3 Vectors（ベクトル保存）
    ↓ Bedrock KB が参照
  AI回答（最新データで応答）
  ```

### 9.2 AWS リソースのセットアップ

#### 9.2.1 S3バケット作成
- [ ] ドキュメント保存用 S3 バケット作成
  ```bash
  aws s3 mb s3://rag-ai-agent-docs --region ap-northeast-1
  ```
- [ ] バケットポリシー設定（Bedrock KB がアクセス可能に）

#### 9.2.2 Bedrock Knowledge Base 作成
- [ ] Knowledge Base の作成
  - データソース: S3 バケット
  - Embeddings モデル: `amazon.titan-embed-text-v1`
  - ベクトルストア: **S3 Vectors**（新機能）
- [ ] Knowledge Base ID を取得・環境変数に設定

#### 9.2.3 Lambda 関数の作成
- [ ] Lambda 関数の実装
  - S3 イベント（PutObject）をトリガー
  - Bedrock KB の同期ジョブを起動
- [ ] IAM ロールの設定
  - S3 読み取り権限
  - Bedrock KB 同期権限

### 9.3 管理画面の実装

#### 9.3.1 ドキュメント管理UI
- [ ] ドキュメント一覧画面
  - S3 バケットのファイル一覧を表示
- [ ] ドキュメント編集画面
  - テキストエディタ（Markdown対応）
  - S3 への保存機能
- [ ] ドキュメント追加画面
  - 新規ドキュメント作成
  - ファイルアップロード

#### 9.3.2 バックエンドAPI
- [ ] FastAPI エンドポイント追加
  - `GET /api/documents` - ドキュメント一覧
  - `GET /api/documents/{id}` - ドキュメント取得
  - `PUT /api/documents/{id}` - ドキュメント更新
  - `POST /api/documents` - ドキュメント追加
  - `DELETE /api/documents/{id}` - ドキュメント削除

### 9.4 RAG統合

#### 9.4.1 LangChain統合
- [ ] `AmazonKnowledgeBasesRetriever` の実装
  ```python
  from langchain_aws import AmazonKnowledgeBasesRetriever
  
  retriever = AmazonKnowledgeBasesRetriever(
      knowledge_base_id=KB_ID,
      retrieval_config={"vectorSearchConfiguration": {"numberOfResults": 3}}
  )
  ```
- [ ] RAGチェーンの構築
- [ ] エージェントへの統合

#### 9.4.2 環境変数の追加
- [ ] `.env` に Knowledge Base ID を追加
  ```
  BEDROCK_KB_ID=your-kb-id
  ```

### 9.5 テスト

#### 9.5.1 ドキュメント管理のテスト
- [ ] ドキュメント追加のテスト
- [ ] ドキュメント編集のテスト
- [ ] S3への保存確認

#### 9.5.2 自動同期のテスト
- [ ] S3イベント → Lambda 起動の確認
- [ ] Bedrock KB 同期ジョブの確認
- [ ] S3 Vectors への反映確認

#### 9.5.3 RAG応答のテスト
- [ ] ドキュメント追加後、AIが最新情報を参照することを確認
- [ ] 検索精度の確認
- [ ] レスポンス時間の測定

---

## フェーズ10: AWS本番環境デプロイ

### 10.1 フロントエンドデプロイ（S3 + CloudFront）
- [ ] S3バケット作成
  - 静的ウェブサイトホスティング設定
  - バケットポリシー設定
- [ ] Next.jsビルド
  ```bash
  cd frontend
  npm run build
  npm run export  # 静的エクスポート
  ```
- [ ] S3へアップロード
  ```bash
  aws s3 sync out/ s3://your-bucket-name/
  ```
- [ ] CloudFront ディストリビューション作成
  - オリジン: S3バケット
  - SSL証明書設定（ACM）
  - カスタムドメイン設定（Route53）

### 10.2 バックエンドデプロイ（AgentCore）
- [ ] IAM権限の修正完了
- [ ] AgentCoreへデプロイ
  ```bash
  cd backend
  agentcore launch
  ```
- [ ] デプロイ後の動作確認

### 10.3 環境変数の更新
- [ ] フロントエンドの環境変数を本番用に更新
  - `NEXT_PUBLIC_API_URL` を AgentCore のエンドポイントに設定
- [ ] 再ビルド・再デプロイ

### 10.4 本番環境テスト
- [ ] エンドツーエンドテスト
- [ ] パフォーマンステスト
- [ ] セキュリティチェック

---

## フェーズ11: 認証機能の実装

### 11.1 認証サービス選定
- [ ] AWS Cognito のセットアップ
  - ユーザープール作成
  - アプリクライアント設定

### 11.2 フロントエンド認証実装
- [ ] Cognito統合（Amplify または AWS SDK）
- [ ] ログイン画面の実装
- [ ] サインアップ画面の実装
- [ ] 認証状態の管理

### 11.3 バックエンド認証実装
- [ ] JWT検証の実装
- [ ] 認証ミドルウェアの追加
- [ ] ユーザー情報の取得

### 11.4 テスト
- [ ] ログイン・ログアウトのテスト
- [ ] 認証エラーハンドリングのテスト
- [ ] セッション管理のテスト

---

## 進捗管理

### 完了したフェーズ
- [x] フェーズ1: 環境構築と事前準備
- [x] フェーズ2: プロジェクト構造の作成
- [x] フェーズ3: バックエンド実装
- [x] フェーズ4: フロントエンド実装
- [x] フェーズ5: ローカル動作確認
- [x] フェーズ6: ドキュメント作成
- [/] フェーズ7: AgentCoreデプロイ（IAM権限待ち）
- [x] フェーズ8: MVP完成

### 次のフェーズ
- [ ] フェーズ9: RAG機能の実装
- [ ] フェーズ10: AWS本番環境デプロイ
- [ ] フェーズ11: 認証機能の実装

### メモ・課題
```
【完了】
- チャットアプリMVP完成
- GitHubリポジトリ作成・プッシュ完了
- LangSmith統合完了

【保留中】
- AgentCoreデプロイ: IAM権限（AccessDeniedException）の解決待ち

【次のステップ】
1. IAM権限の修正
2. AgentCoreデプロイの完了
3. RAG機能の実装開始
```

# Not-ToDo

「今日は、やらないことを決める日」

## プロジェクト概要

Not-ToDo は、やるべきことを増やすのではなく、**「今日はやらないことを自分で選ぶ」**ためのシンプルなタスク管理ツールです。ToDoリストに埋もれ、終わらない毎日に疲弊する現代人に向けて、**「全部はできない。でも、選ぶことはできる」**という実感を取り戻します。

### 主な機能

1. **やらないことを選ぶ**
   - 今日やらないタスクを3つまで選択できます
   - 選んだタスクはグレーアウトされ、「今日のNot-ToDo」に移動します

2. **理由を添える（任意）**
   - やらない理由を簡単に記録できます
   - 「優先度が低い」「今日は無理しない」など選択肢から選べます

3. **見届ける**
   - 選んだNot-ToDoタスクが一覧で表示されます
   - 「残りのタスクに集中できます」という肯定的なメッセージが表示されます

## 技術スタック

- **フロントエンド**: React + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **アイコン**: React Icons
- **データ保存**: localStorage

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone <your-repo-url>
cd not-todo

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## E2Eテスト

```bash
# E2Eテストを対話モードで実行（Cypressのブラウザを開く）
npm run cypress:open

# E2Eテストをヘッドレスモードで実行
npm run test:e2e
```

## ディレクトリ構造

```
not-todo/
├── public/              # 静的ファイル
├── src/                 # ソースコード
│   ├── components/      # Reactコンポーネント
│   │   ├── TaskSelectionScreen.tsx   # タスク選択画面
│   │   ├── ReasonSelectionScreen.tsx # 理由選択画面
│   │   └── NotTodoListScreen.tsx     # 結果表示画面
│   ├── types/           # 型定義
│   │   └── index.ts     # タスクとアプリの型定義
│   ├── utils/           # ユーティリティ関数
│   │   └── storage.ts   # ローカルストレージ操作
│   ├── App.tsx          # メインアプリケーション
│   ├── main.tsx         # エントリーポイント
│   └── index.css        # グローバルスタイル
├── tailwind.config.js   # Tailwind CSS設定
├── vite.config.ts       # Vite設定
├── tsconfig.json        # TypeScript設定
├── package.json         # 依存関係とスクリプト
└── README.md            # プロジェクトの説明
```

## 本番環境へのデプロイ

```bash
# プレビュー
npm run preview
```

### Vercelへのデプロイ

1. [Vercel](https://vercel.com/)にアカウント作成・ログイン
2. 「New Project」ボタンをクリック
3. GitHubリポジトリをインポート
4. 「Deploy」ボタンをクリック

## カスタマイズ

- `src/types/index.ts`: サンプルタスクや理由の選択肢を変更できます
- `src/index.css`: 色やフォントなどのスタイルをカスタマイズできます
- `tailwind.config.js`: Tailwind CSSの設定を調整できます

## プロジェクトの哲学

このプロダクトは、「全部やれ」という現代の要求に対して、「今日はこれに応えない」と静かに言える余白を支える試みです。思想のインストールより先に、気持ちよく手放す体験を届けることを目指しています。

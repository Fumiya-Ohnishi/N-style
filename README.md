# N-style

## 開発環境
node.js：v14.18.1

### 環境構築
```
# 開発に必要なパッケージ群をインストールする
npm ci
# localhost:3000サーバを起動する
npm run start 
# distを削除する
npm run delete:dist
#コード成形
npm run beautify
```

## サイトディレクトリ構成
```    
root/  
  ├── dist/                       // 出力先（Git管理外）
  │   │── assets/                 // 実際に使用する資源ディレクトリ  
  │   │   ├── css/                // ビルド後のcss群（このテンプレートではstyle.cssが生成される）  
  │   │   ├── img/                // ビルド後の画像群  
  │   │   └── js/                 // ビルド後のjs群  
  │   │── news/
  │   └── index.html  
  │     
  ├── src/                        // 開発資源  
  │   ├── ejs/                    // ビルド前のejs群  
  │   │── assets/                 
  │       ├── css/                // ビルド前のcss群  
  │       ├── img/                // ビルド前の画像群  
  │       └── js/    │            // ビルド前のjs群
  ├── webpack.config.js           // Webpackの設定ファイル  
  └── imagemin.mjs                // 画像圧縮設定ファイル
```    

### JS  
- `index.js`がエントリーポイントです。

### prettier
1. VScodeの拡張機能のPrettierをインストールしてください。  
2. このフォルダーにあるprettierrcファイルを使用して整形してください。
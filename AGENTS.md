# LearnChinese 工作規範

## 架構與資料

- Docusaurus 3.10.2 靜態站；React 19.3、MDX 3、MUI 5、Sass。不要單獨升級某個 Docusaurus 套件。
- `docs/` 是學生課文；`src/components/MDX` 提供互動內容，`src/theme` 是有意保留的 swizzle。`src/pages` 是首頁、Learn 目錄與語基頁。
- `src/components/plugin` 處理註釋、段落標題、舊路由與公開課程資料。公開課程經 `dynamicRoutes` 的 route modules 傳入 Learn；目錄只使用 plugin global data，不得以動態 require 把私有課程全部打包。
- `src/data/Learn` 保留六課；`teaching/learn` 是私有備課／來源紀錄，不可放到學生頁或 `static/`。
- Quiz 在各篇 MDX 直接 import JSON，明確傳入 `data={quizData.questions}`；不要恢復檔名推導／動態 require，也不要新增相同內容的 settext 副本。
- 目前只有 `rhetoric` 公開；其餘五課 `published:false`，未經使用者要求不得發布。資料基準為 117 步、91 互動步驟。

## 環境與命令

- 使用 `.nvmrc` 的 Node 24.22.0、npm 11.19.1；只保留 `package-lock.json`，用 `npm ci` 安裝。Vercel 使用 Node 24.x，實際雲端 patch 由平台管理。
- `.npmrc` 有 7 天 release cooldown 與 install-script allowlist 檢查。升級 install-script 套件前讀腳本，再用 `npm install-scripts approve <package>` 更新精確版本；不要 blanket approve。
- `npm start`：開發。`npm run build`：production；`npm run serve -- --host 127.0.0.1 --port 4173 --no-open`：本機預覽。
- `npm run check`：全專案 strict typecheck、lint、增量格式、六課資料檢查與單元測試。
- `npm run typecheck` 與 `npx tsc` 使用 TypeScript 7.0.2；ESLint 的 TS parser 和測試轉譯使用 Babel 8，不依賴舊 TypeScript API。保留 Hooks、禁止 any 與 TS suppression 的 lint 規則。根 tsconfig 明列 Docusaurus 所需設定，避免繼承其 TS 7 已移除的 baseUrl。
- `npm run check:build`：build 後檢查課程發布、私有資料、靜態資源及 bundle 大小。
- `npx playwright install chromium` 後，`npm run test:browser` 會在 4174 啟動 production serve；先 build。CI Linux 使用 `--with-deps` 安裝瀏覽器。
- `npm audit` 會報目前未有修補版的 braces advisory；詳細原因、overrides 與限制見 `MAINTENANCE.md`。不得用降級框架或隱藏輸出把 audit 假裝修好。

## 程式、內容與畫面

- 新程式用 TS/TSX，props、外部資料及 storage 邊界要有型別。根 `tsconfig.json` 全面啟用 strict，`tsconfig.strict.json` 僅為相容入口；不要使用 any、ts-ignore 或關閉 diagnostics 規避問題。
- 元件先定義 `type Props = { ... }`，再寫 `const Component = ({ ... }: Props) => ...`；不用 `React.FC`，也不用額外的 component function type。多個元件同檔時可用具名 `HeaderProps` 等別名。
- 首頁打字動畫由 `HomeTypewriter` 在 effect 內載入 TypeIt 原生引擎，保留原有游標移動／改字順序並清理 instance；不要加回 typeit-react。語基展開使用既有 MUI Collapse，不使用 react-collapsible。
- Hooks 須通過 rules-of-hooks 與 exhaustive-deps。訂閱、音訊、timer 要有清理；使用者操作造成的提交放在事件處理器，不能靠 render/effect 重複送出。
- 使用共用 `src/utils/useLocalStorage.ts`，hydration 後讀取、驗證 unknown、讀取不寫回。保留 `learn.*` 與 `Points` 舊 key、有效紀錄及無關文章資料。
- 保留 MDX、`mdx-code-block`、Annotate 和 Section 規則；純文字不必為統一風格改寫。MDX 不由通用 formatter 重排；以 production build 驗證所有文章與 anchor。
- Annotate 簡寫由 remark 文字節點轉換，不處理程式碼或 JSX attributes。字體衍生檔由 `scripts/prepare-fonts.py` 產生；保留原始字體與完整字集 fallback，正常 build 不需重新產生。
- 使用 `clsx`，不要依賴未直接宣告的傳遞套件。優先用框架公開介面；保留有外觀用途的 CodeBlock、DocItem/Content、Footer 等 swizzle。
- 換行用 LF；`.gitattributes` 尤其固定 `docs/contents/**/*.mdx`。不要改全域 Git 設定或大規模正規化檔案。
- 格式設定在 `.prettierrc.json`。`format:check` 掃描程式與工具設定；`scripts/format-baseline.json` 只容許完全未變的舊格式。改到既有檔案便用 `npx prettier --write <file>`；不可更新 hash 掩蓋新格式問題。
- 預設保護文字、內容、路由、排版、配色、背景及字體。學生文字使用繁體中文，不自行改寫教材。
- Learn 保留 OpenCC 正規化、答案與標示分離、示範可編輯及改錯／清空後鎖題、三種動態題型、Alt+H、原生按鈕及 IME 行為。進度右欄預設收合，寬度 <=1099px 隱藏。

## 交付

- 先查 Git 狀態，保留未提交及已暫存修改。每項非局部變更須交代必要性與驗證，不混入順手清理。
- 涉及 SSR 或元件行為，要測 production 直接載入與重新整理，不能只看 dev 或 SPA 切換；同時檢查 console recoverable errors。
- UI 改動要留代表性畫面並與基準比較。測試不得向正式評分、分析或影片服務送出測試資料。
- 驗證保持輕量，以 typecheck、build 與必要的瀏覽器檢查為主；不為低風險修改增加 spec 或大量測試檔。
- 回報實際執行結果、未解問題與範圍限制。CI workflow 或 Vercel 設定存在不等於已在雲端跑過。
- 除非使用者另行授權，不 commit、push 或部署。

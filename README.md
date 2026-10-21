# [書目引得](https://learnchinese.vercel.app/)

## 中文科閱讀篇章

「稽古有得，隨時劄記，久而類次成書。」——顧炎武《日知錄》

## 本機開發與驗證

使用 `.nvmrc` 指定的 Node 24.22.0 與 npm 11.19.1，執行 `npm ci` 安裝；本專案以 `package-lock.json` 為唯一鎖檔。

`npm run typecheck` 與 `npx tsc` 使用 TypeScript 7.0.2 原生編譯器。ESLint 用 Babel parser 檢查 TS／TSX，保留 Hooks 規則；現有測試與 Learn 資料檢查也改用 Babel 轉譯，不依賴舊 TypeScript API。編輯器的 TS 7 語言伺服器須另外由編輯器支援；MDX 語言外掛仍可能需要舊 API。

```sh
npm start
npm run check
npm run build
npm run check:build
npx playwright install chromium
npm run test:browser
```

`check` 包含全專案 strict 型別、Hooks/lint、增量格式、六課 Learn 資料與 Testing Library DOM 測試。瀏覽器測試使用 production build，並攔截評分與分析請求。專案使用 React 19；元件採 `type Props` 與 `const Component = ({ ... }: Props) => ...`。依賴選擇、已知 audit 問題與升級流程見 [維護紀錄](MAINTENANCE.md)；協作規範見 [AGENTS.md](AGENTS.md)。

## MDX Components

### Quiz 資料

每篇文章直接匯入自己的題庫，`Quiz` 與 `QuizAnswers` 傳入同一份 `questions`；不再依文章檔名動態載入整個題庫目錄。

```mdx
import quizData from '@site/src/data/Quiz/背影.json';

<Quiz data={quizData.questions} />
<QuizAnswers data={quizData.questions} />
```

### Annotate

| Props    | Description                |
| -------- | -------------------------- |
| title    | Tooltip title              |
| children | Tooltip reference element. |

The `<Annotate>` component allows you to create tooltips for text. You can use it in two ways:

```jsx example
// Component Syntax
<Annotate title="This is a tooltip">Hover over me</Annotate>

// Double Parentheses Syntax
((Hover over me||This is a tooltip))
```

簡寫由 remark 處理文字節點，支援解釋中的雙引號；行內程式碼、一般 fenced code blocks 與 JSX attributes 不會被替換。MDX 的特殊字元仍依 Markdown／MDX 規則跳脫；需要複雜內容時使用完整 `<Annotate>`。註釋支援 Tab 聚焦、Enter／Space 切換及 Escape 關閉。

### 字體資源

原始字體保留在 `src/font`。`src/font/web` 和 `src/css/_fonts.scss` 是預先產生的 WOFF2 與 unicode-range：現有公開內容使用較小字集，其餘字元按需載入完整字體，不會因日後新增文字而失去原有字元覆蓋。一般 npm build 不需要 Python。

只有需要更新小字集時才執行（Windows）：

```powershell
python -m venv .validation/font-tools
.validation/font-tools/Scripts/python.exe -m pip install fonttools==4.67.0 brotli==1.2.0
.validation/font-tools/Scripts/python.exe scripts/prepare-fonts.py
npx prettier --write src/css/_fonts.scss
```

產生器只掃描公開內容，不讀取 `teaching` 或未公開 Learn 課程；保留字型輪廓、hinting、OpenType layout features 與名稱／版權資訊。

### Admonition

| Name         | Title                     | Usage                                       |
| ------------ | ------------------------- | ------------------------------------------- |
| Info         | 題引                      | <Info> Your Content </Info>                 |
| Note         | 筆記                      | <Note> Your Content </Note>                 |
| Quote        | You Know What They Say... | <Quote> Your Content </Quote>               |
| YouWillLearn | 學習重點                  | <YouWillLearn> Your Content </YouWillLearn> |
| Resources    | 學習資源                  | <Resources> Your Content </Resources>       |

You can change title by passing `title` prop.

```jsx exmaple
<Note title="為什麼歐陽修自稱「六一居士」？"> Content </Note>
```

### AudioCard

| Props    | Description                       |
| -------- | --------------------------------- |
| title    | Title of the AudioCard            |
| src      | URL of the file to play           |
| subtitle | Subtitle of the AudioCard         |
| image    | Image to show (single track only) |
|          |                                   |
| cap      | track caption (multi tracks only) |

```jsx examples
// single track
<AudioCard track={{title:'【普】〈背影〉', subtitle:'朱自清', src:'/audio/背影(普通話).m4a'}} />

//multi tracks
<AudioCard tracks={[
    {title: "【粵】〈登樓〉", src: "/audio/登樓(粵語).mp3", subtitle: "杜甫(EDB)", cap: "粵語",},
    {title: "【普】〈登樓〉", src: "/audio/登樓(普通話).mp3", subtitle: "杜甫(EDB)", cap: "普通話",},
    ]}/>
```

### Carousel

| Props    | Description                                             |
| -------- | ------------------------------------------------------- |
| children | An array of image URLs to be displayed in the carousel. |

```jsx example
<Carousel>{["/img/S1/6.5風雪中的北平/北平1.jpg", "/img/S1/6.5風雪中的北平/北平2.jpg"]}</Carousel>
```

### ExpandableExample

| Name       | Title       | Usage                                   |
| ---------- | ----------- | --------------------------------------- |
| Dictionary | 📜 字詞釋義 | <Dictionary> Your content </Dictionary> |
| DeepDive   | 深入探討    | <DeepDive> Your Content </DeepDive>     |

Props for `DeepDive`

| Name     | Usage                                                                              |
| -------- | ---------------------------------------------------------------------------------- |
| title    | The title of the deep dive topic.                                                  |
| excerpt  | An optional excerpt, which can include HTML links.                                 |
| children | The content of the deep dive, which can include text, images, or other components. |

```jsx example
<DeepDive
  title="本文如何運用隨時推移法來描寫北平?"
  excerpt="<a href='https://learnchinese.vercel.app/'>Link</a"
>
  Your Content
</DeepDive>
```

### Lexis

| Props    | Description                                                                    |
| -------- | ------------------------------------------------------------------------------ |
| py       | The pinyin Jyutping of the character.                                          |
| children | The Chinese character to display, typically a homophone. It can be left empty. |

```jsx example
<Jypt py="joeng4">羊</Jypt>
```

This will render as a clickable button that, when clicked, plays the audio of the Jyutping pronunciation.
Fetching Audio from [粵語審音配詞字庫](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/)

<!--
### Challenges
`Challenges` Component
The Challenges component serves as the container for your challenges and provides the structure for grouping multiple ChallengeItem components.

`ChallengeItem` Component
The ChallengeItem component represents an individual challenge item. It contains the content related to a specific challenge.

Props for ChallengeItem
| Name | Description |
| -------- | ------------------------------------------------------- |
| label | A label or title for the challenge. |
| children | Content within the challenge item, such as quizzes, solutions, or task discussions. |

Nested Components
Quiz: Represents a quiz component. Quiz should be presented as a JSON file, located at `src/data/Quiz`. It takes a `href` prop, allows user to save to quiz.
Solution: Contains the solution to a quiz.
QuizAnswers: Displays quiz answers.
NoSolution: Indicates that there is no solution available.
Tabs: A component that manages tabs for different discussion topics.
TabItem: Represents an individual tab within the Tabs component.
Task: Contains task content. -->

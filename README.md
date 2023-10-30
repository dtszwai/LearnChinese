# [書目引得](https://learnchinese.vercel.app/)

## 中文科閱讀篇章

「稽古有得，隨時劄記，久而類次成書。」——顧炎武《日知錄》

## MDX Components

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

| props    | description                       |
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

| props    | description                                             |
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

## Lexis

| props    | Usage                                                                          |
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

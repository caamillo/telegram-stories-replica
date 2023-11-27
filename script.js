// Stories DOM
const stories = document.querySelector('.stories')

// Behind DOM
const behinds = document.querySelector('.behinds')

const STORY_SIZE = 120
let wScreen = window.innerWidth

let appendedStories = 0

const rndRgb = (lower=true) =>
    Math.floor(Math.random() * ((lower ? 128 : 256) - (lower ? 0 : 128) + 1) + (lower ? 0 : 128))

const rndRgbStr = (lower=true) =>
    `rgb(${ rndRgb(lower) },${ rndRgb(lower) },${ rndRgb(lower) })`

stories.querySelector('[data-template]').style.background = `linear-gradient(${ rndRgbStr(false) }, ${ rndRgbStr(true) })`

const updateOffset = () => {
    const storiesArr = [ ...stories.children ]
    document.documentElement.style.setProperty('--modifier', `${ 25 * storiesArr.length }px`)
    if (storiesArr.length > 1) document.documentElement.style.setProperty('--init', '25px')
}

const appendStory = () => {
    const MAX_STORIES = Math.floor(wScreen / STORY_SIZE)
    if (stories.children.length >= MAX_STORIES) return appendedStories += 1

    const templateStory = stories.querySelector('[data-template]').cloneNode(true)
    const templateBehind = behinds.querySelector('[data-template]').cloneNode(true)
    templateStory.style.background = `linear-gradient(${ rndRgbStr(false) }, ${ rndRgbStr() })`

    stories.appendChild(templateStory)
    behinds.appendChild(templateBehind)

    const storiesArr = [ ...stories.children ]
    const behindsArr = [ ...behinds.children ]

    for (let idx in storiesArr) {
        const story = storiesArr[idx]
        const behind = behindsArr[idx]

        story.querySelector('[data-count]').innerHTML = idx
        story.style.transform = `translateX(-${ 50 * idx }px)`
        behind.style.transform = `translateX(-${ 50 * idx }px)`

        story.style.zIndex = `-${ idx }`
        behind.style.zIndex = `-${ idx }`
    }

    updateOffset()
}

const popStory = () => {
    appendedStories += 1

    const lastStory = stories.querySelector('.story:last-child')
    const lastBehind = behinds.querySelector('.story:last-child')

    stories.removeChild(lastStory)
    behinds.removeChild(lastBehind)

    updateOffset()
}

const btnAdd = document.querySelector('[data-add]')

btnAdd.onclick = appendStory
btnAdd.onmousedown = () => btnAdd.setAttribute('data-press', true)
btnAdd.onmouseup = () => btnAdd.setAttribute('data-press', false)

window.onresize = () => {
    wScreen = window.innerWidth
    const MAX_STORIES = Math.floor(wScreen / STORY_SIZE)
    if (stories.children.length <= MAX_STORIES && appendedStories > 0) {
        appendedStories -= 1
        appendStory()
    } else if (stories.children.length > MAX_STORIES) popStory()
}
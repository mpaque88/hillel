const TABSET_CONTAINER = 'tab-tabset';
const TABSET_TITLE = 'tab-title';
const TABSET_CONTENT = 'tab-content';

class Tabset {
    constructor(el) {
        this.el = el;
        this.titleSet = this.el.children[0];
        this.contentSet = this.el.children[1];
        this.onElementClick = this.onElementClick.bind(this);

        this.bindClasses();
        this.bindIndexes();
        this.bindEventListeners();
    }

    bindClasses() {
        this.el.classList.add(TABSET_CONTAINER);
        this.titleSet.classList.add(TABSET_TITLE);
        this.contentSet.classList.add(TABSET_CONTENT);
    }

    bindIndexes() {
        for (let i = 0; i < this.titleSet.children.length; i++) {
            this.titleSet.children[i].setAttribute('data-tab-title-index', i + 1);
            this.contentSet.children[i].setAttribute('data-tab-content-index', i + 1);
        }
    }

    bindEventListeners() {
        this.el.addEventListener('click', this.onElementClick);
    }

    onElementClick(e) {
        if (e.target.dataset.tabTitleIndex) {
            const tabIndex = e.target.dataset.tabTitleIndex - 1;
            const contentDivs = this.contentSet.children;
            const isOpened = contentDivs[tabIndex].classList.contains('tab-active');

            for (let i = 0; i < contentDivs.length; i++) {
                contentDivs[i].classList.remove('tab-active');
            }

            if (!isOpened) {
                contentDivs[tabIndex].classList.add('tab-active');
            }
        }
    }
}

const tabIndex = new Tabset(
    document.getElementById('tab-container')
)
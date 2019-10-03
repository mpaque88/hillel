const TABSET_CONTAINER = 'tab-tabset';
const TABSET_TAB_ACTIVE = 'tab-active';
const TABSET_TITLE = 'tab-title';
const TABSET_TITLE_INDEX = 'data-tab-title-index';
const TABSET_CONTENT = 'tab-content';
const TABSET_CONTENT_INDEX = 'data-tab-content-index';

class Tabset {
    constructor(el) {
        this.el = el;
        this.titleSet = this.el.children[0].children;
        this.contentSet = this.el.children[1].children;
        this.onElementClick = this.onElementClick.bind(this);

        this.bindClasses();
        this.bindIndexes();
        this.bindEventListeners();
    }

    bindClasses() {
        this.el.classList.add(TABSET_CONTAINER);
        this.el.children[0].classList.add(TABSET_TITLE);
        this.el.children[1].classList.add(TABSET_CONTENT);

        this.contentSet[0].classList.add(TABSET_TAB_ACTIVE);
        this.titleSet[0].classList.add(TABSET_TAB_ACTIVE);
    }

    bindIndexes() {
        for (let i = 0; i < this.titleSet.length; i++) {
            this.titleSet[i].setAttribute(TABSET_TITLE_INDEX, i + 1);
            this.contentSet[i].setAttribute(TABSET_CONTENT_INDEX, i + 1);
        }
    }

    bindEventListeners() {
        this.el.addEventListener('click', this.onElementClick);
    }

    onElementClick(e) {
        if (e.target.dataset.tabTitleIndex) {
            const tabIndex = e.target.dataset.tabTitleIndex - 1;
            const isOpened = this.contentSet[tabIndex].classList.contains(TABSET_TAB_ACTIVE);

            this.hideAllTabs();

            if (!isOpened) {
                this.showTab(tabIndex);
            }
        }
    }
    
    hideAllTabs() {
        for (let i = 0; i < this.contentSet.length; i++) {
            this.contentSet[i].classList.remove(TABSET_TAB_ACTIVE);
            this.titleSet[i].classList.remove(TABSET_TAB_ACTIVE);
        }
    }
    
    showTab(index) {
        this.contentSet[index].classList.add(TABSET_TAB_ACTIVE);
        this.titleSet[index].classList.add(TABSET_TAB_ACTIVE);
    }

    show(x) {
        this.hideAllTabs();
        this.showTab(x-1);
    }
    
    prev() {
        const activeTabIndex = document.querySelector(`.${TABSET_TAB_ACTIVE}`).dataset.tabTitleIndex;
        
        this.hideAllTabs();
        
        if (activeTabIndex == 1) {
            this.showTab(this.contentSet.length - 1);
        } else {
            this.showTab(activeTabIndex - 2);
        }
    }
    
    next() {
        const activeTabIndex = document.querySelector(`.${TABSET_TAB_ACTIVE}`).dataset.tabTitleIndex;
        
        this.hideAllTabs();
        
        if (activeTabIndex == this.contentSet.length) {
            this.showTab(0);
        } else {
            this.showTab(activeTabIndex);
        }
    }
    
}

const myTabset = new Tabset(
    document.getElementById('tab-container')
    )
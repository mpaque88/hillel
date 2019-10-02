const TABSET_CONTAINER = 'tab-tabset';
const TABSET_TITLE = 'tab-title';
const TABSET_CONTENT = 'tab-content';

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

        this.contentSet[0].classList.add('tab-active');
        this.titleSet[0].classList.add('tab-active');
    }

    bindIndexes() {
        for (let i = 0; i < this.titleSet.length; i++) {
            this.titleSet[i].setAttribute('data-tab-title-index', i + 1);
            this.contentSet[i].setAttribute('data-tab-content-index', i + 1);
        }
    }

    bindEventListeners() {
        this.el.addEventListener('click', this.onElementClick);
    }

    onElementClick(e) {
        if (e.target.dataset.tabTitleIndex) {
            const tabIndex = e.target.dataset.tabTitleIndex - 1;
            const isOpened = this.contentSet[tabIndex].classList.contains('tab-active');

            this.hideAllTabs();

            if (!isOpened) {
                this.contentSet[tabIndex].classList.add('tab-active');
                this.titleSet[tabIndex].classList.add('tab-active');
            }
        }
    }

    hideAllTabs() {
        for (let i = 0; i < this.contentSet.length; i++) {
            this.contentSet[i].classList.remove('tab-active');
            this.titleSet[i].classList.remove('tab-active');
        }
    }

    show(x) {
        this.hideAllTabs();

        this.contentSet[x - 1].classList.add('tab-active');
        this.titleSet[x - 1].classList.add('tab-active');
    }

    prev() {
        const activeTabIndex = document.querySelector('.tab-active').dataset.tabTitleIndex;
        
        this.hideAllTabs();
        
        if (activeTabIndex == 1) {
            this.contentSet[this.contentSet.length - 1].classList.add('tab-active');
            this.titleSet[this.titleSet.length - 1].classList.add('tab-active');
        } else {
            this.contentSet[activeTabIndex - 2].classList.add('tab-active');
            this.titleSet[activeTabIndex - 2].classList.add('tab-active');
        }
    }
    
    next() {
        const activeTabIndex = document.querySelector('.tab-active').dataset.tabTitleIndex;
        
        this.hideAllTabs();
        
        if (activeTabIndex == this.contentSet.length) {
            this.contentSet[0].classList.add('tab-active');
            this.titleSet[0].classList.add('tab-active');
            
        } else {
            this.contentSet[activeTabIndex].classList.add('tab-active');
            this.titleSet[activeTabIndex].classList.add('tab-active');
        }

        //add showTab(index) method; replace the repeating code with it

    }
}

const myTabset = new Tabset(
    document.getElementById('tab-container')
)
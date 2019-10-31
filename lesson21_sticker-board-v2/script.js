$(function() {
    const $body = $('#body');
    const $form = $('#add-sticker-form');
    const $addStickerBtn = $('#add-sticker-btn');
    const $submitStickerBtn = $('#submit-sticker-btn');
    const $clearAllBtn = $('#clear-sticker-btn');
    const $stickerTemplate = $('#sticker-template').html();
    const $modal = $('#dialog').dialog({autoOpen: false});

    let stickerItems = [];

    $addStickerBtn.on('click', onAddBtnClick);
    $submitStickerBtn.on('click', onSubmitBtnClick);
    $clearAllBtn.on('click', clearAllStickers);
    $body.on('click', '.delete-btn', onRmBtnClick);

    init();
    
    function init() {
        getLocalData();
        renderStickers();
    }

    function renderStickers() {
        appendItems(getItemsHtml());
        adjustOffset();
        makeDraggable($body.children());
    }

    function onAddBtnClick() {
        $modal.dialog('open');
        clearForm();
    }

    function onSubmitBtnClick(e) {
        e.preventDefault();

        const sticker = createSticker();
        $body.append(getItemHtml(sticker));
        makeDraggable($body.children('.sticker:last-child'));
        stickerItems.push(sticker);

        saveState();
        clearForm();
        $modal.dialog('close');
    }

    function onRmBtnClick() {
        const $item = $(this).closest('.sticker');
        deleteStickerItem($item.data('stickerIndex'));

        saveState();
    }

    function getItemsHtml() {
        const stickersHtml = stickerItems.map(item => {
            return getItemHtml(item);
        })

        return stickersHtml;
    }

    function appendItems(html) {
        $body.html(html.join(''));
    }

    function adjustOffset() {
        $body.children('.sticker').each(setPosition)
    }

    function setPosition(){
        const offset = getOffsetById($(this).data('stickerIndex'));

        $(this).offset(offset);
    }

    function getOffsetById(id) {
        const item = stickerItems.find(item => item.id == id);
        return item.offset
    }

    function makeDraggable(elem) {
        elem.draggable({handle: '.sticker-header', stop: savePosition})
    }

    function clearForm() {
        $form.children().val('');
    }

    function saveState() {
        localStorage.setItem('myStickers', JSON.stringify(stickerItems));
    }

    function getLocalData() {
        if(localStorage.getItem('myStickers'))
            stickerItems = JSON.parse(localStorage.getItem('myStickers'))
    }

    function savePosition() {
        stickerItems.find(item => {
            if (item.id == $(this).data('stickerIndex'))
                item.offset = $(this).offset();
        })

        saveState();
    }

    function createSticker() {
        const newSticker = {id: Date.now()};
        
        $form.serializeArray().forEach(({name, value}) => {
            newSticker[name] = value;
        })

        return newSticker;
    }

    function deleteStickerItem(targetId) {
        stickerItems = stickerItems.filter(({id}) => id != targetId);

        getStickerElemById(targetId).remove();
    }

    function getStickerElemById(id) {
        return $(`[data-sticker-index="${id}"]`)
    }

    function getItemHtml({id, title, detail}) {
        return $stickerTemplate
            .replace('{{id}}', id)
            .replace('{{title}}', title)
            .replace('{{detail}}', detail)
    }

    function clearAllStickers() {
        $body.empty();
        stickerItems = [];
        saveState();
    }
})
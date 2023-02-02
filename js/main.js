// *---------- Functions ----------*
function $(a) {
    return document.querySelector(a);
}
function $all(a) {
    return document.querySelectorAll(a);
}
function panelClean() {
    $('.panel__input').value = '';
    $('.panel__textarea').value = '';
    $all('.panel__img--content-add.copy').forEach(function(item) {
        item.remove();
    })
}
function blockAddSwitch() {
    panelAdd.classList.toggle('active');
    buttonsMenu.classList.toggle('active');
}
function likeWord(element, countLike, item) {
    const like = element.querySelector(`.${item}`);
    if (countLike <= 10 || countLike >= 20) {
        switch(countLike % 10) {
            case 1: {
                like.innerHTML = countLike + ' лайк';
                break;
            }
            case 2:
            case 3:
            case 4: {
                like.innerHTML = countLike + ' лайка';
                break;
            }
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 0: {
                like.innerHTML = countLike + ' лайков';
                break;
            }
        }
    }
    else like.innerHTML = countLike + ' лайков';
}
function commentWord(element, answer, remove) {
    let el;
    if (answer) el = element.parentNode.parentNode.parentNode.parentNode;
    else el = element.parentNode.parentNode;
    const commentBlockItem = el.querySelectorAll('.comment__block--item');
    dig = commentBlockItem.length;
    const commentContent = el.parentNode.querySelector('.comment__content');
    if (remove) {
        dig--;
        if (!answer) {
            const commentBlockItemAnswer = element.parentNode.querySelectorAll('.comment__block--item.answer');
            if (commentBlockItemAnswer.length > 0) dig -= commentBlockItemAnswer.length;
        }
    }
    if (dig == 0) commentContent.innerHTML = '0 комментариев';
    else if (dig <= 10 || dig >= 20) {
        switch(dig % 10) {
            case 1: {
                commentContent.innerHTML = dig + ' комментарий';
                break;
            }
            case 2:
            case 3:
            case 4: {
                commentContent.innerHTML = dig + ' комментария';
                break;
            }
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 0: {
                commentContent.innerHTML = dig + ' комментариев';
                break;
            }
        }
    }
    else commentContent.innerHTML = dig + ' комментариев';
    if (!remove) {
        const elCountLike = el.parentNode.querySelector('.count__like');
        let countLike = Number(elCountLike.value) + randomDig(0, 10);
        elCountLike.value = countLike;
        likeWord(el.parentNode, countLike, 'like');
    }
}
function answerWord(element ,remove) {
    el = element.parentNode.parentNode;
    const commentBlockItemAnswer = el.querySelectorAll('.comment__block--item.answer');
    dig = commentBlockItemAnswer.length;
    const commentAnswer = element.parentNode.querySelector('.comment__answer');
    if (remove) dig--;
    if (dig == 0) commentAnswer.innerHTML = 'Ответить';
    else if (dig <= 10 || dig >= 20) {
        switch(dig % 10) {
            case 1: {
                commentAnswer.innerHTML = dig + ' ответ';
                break;
            }
            case 2:
            case 3:
            case 4: {
                commentAnswer.innerHTML = dig + ' ответа';
                break;
            }
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 0: {
                commentAnswer.innerHTML = dig + ' ответов';
                break;
            }
        }
    }
    else commentAnswer.innerHTML = dig + ' ответов';
}
function randomDig(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function accountName () {
    const arrFirstName = ['Хью', 'Человек', 'Властелин', 'Доктор', 'Мистер', 'Влад', 'Юля', 'Павел', 'Федор', 'Егорик', 'Тони', 'Пушка', 'Эдди', 'Лорд', 'Шерлок', 'Энтони', 'Ник', 'Флоренс', 'Натали', 'Елена', 'Райан'];
    const arrSurName = ['Старк', 'Паук', 'Николаев', 'Стрэндж', 'Пью', 'Окстон', 'Гослинг', 'Рейнольдс', 'Джекман', 'Пупков', 'Холмс', 'Прокопенко', 'Брок', 'Парень', 'Простой'];
    const firstName = arrFirstName[randomDig(0, arrFirstName.length - 1)];
    const surName = arrSurName[randomDig(0, arrSurName.length - 1)];
    return firstName + ' ' + surName;
}
function randomColor() {
    const r = Math.floor(randomDig(0, 256));
    const g = Math.floor(randomDig(0, 256));
    const b = Math.floor(randomDig(0, 256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}
// *---------- Main content ----------*
const main = $('.main');
const mainContent = $('.main__content');
let blockParent;
let imgIndex = 0;
let answerComment;
let answerAccountName;
$('.main').addEventListener('click', function(event) {
    // *---------- Main -> PanelEdit -> panelButtonsEdit -> btnEditNo(click) ----------*
    if (event.target.classList.contains('button__edit--no')) {
        $('.main').querySelector('.panel__edit').remove();
        $('.buttons__menu').classList.add('active');
        blockParent.classList.remove('none');
    }
    // *---------- Main -> PanelEdit -> panelButtonsEdit -> btnEditOk(click) ----------*
    else if (event.target.classList.contains('button__edit--ok')) {
        blockParent.querySelector('.block__title').innerHTML = $('.panel__input--edit').value;
        blockParent.querySelector('.block__text').innerHTML = $('.panel__textarea--edit').value;
        const blockImg = blockParent.querySelectorAll('.block__img');
        blockImg.forEach(function(item) {
            item.remove();
        })
        const panelEdit = $('.main').querySelector('.panel__edit');
        const blockImgContent = blockParent.querySelector('.block__img--content');
        const panelImgLink = panelEdit.querySelectorAll('.panel__img--link');
        for (let i = 1; i < 10; i++) {
            blockImgContent.classList.remove(`img${i}`);
        }
        blockImgContent.classList.add(`img${panelImgLink.length - 1}`);
        panelImgLink.forEach(function(item) {
            const blockImgCopy = $('.ghost').querySelector('.block__img').cloneNode();
            blockImgCopy.src = item.value;
            blockImgContent.append(blockImgCopy);
        })
        const blockImgForRemove = blockParent.querySelectorAll('.block__img');
        blockImgForRemove[0].remove();
        $('.main').querySelector('.panel__edit').remove();
        $('.buttons__menu').classList.add('active');
        blockParent.classList.remove('none');
    }
    // *---------- Main -> PanelEdit -> panelButtonsEdit -> panelButtonImgEdit(click) ----------*
    else if (event.target.classList.contains('panel__button--img-edit')) {
        const panelImgContentEdit = $('.main').querySelector('.panel__img--content-edit');
        panelImgContentEdit.classList.remove('none');
        const panelImgLink = $('.main').querySelector('.panel__img--link-edit');
        panelImgLink.classList.remove('first');
        const panelImgContentCopy = panelImgContentEdit.cloneNode(true);
        panelImgContentEdit.classList.add('none');
        panelImgLink.classList.add('first');
        if ($('.main').querySelectorAll('.panel__img--content-edit.copy').length < 9) {
            event.target.before(panelImgContentCopy);
            panelImgContentCopy.classList.add('copy');
        }
    }
    // *---------- Main -> Block -> btnRemove(click) ----------*
    else if (event.target.classList.contains('btn__remove')) {
        event.target.parentNode.remove();
    }
    // *---------- Main -> Block -> btnEdit(click) ----------*
    else if (event.target.classList.contains('btn__edit')) {
        blockParent = event.target.parentNode;
        $('.ghost').querySelector('.panel__input--edit').value = blockParent.querySelector('.block__title').innerText;
        $('.ghost').querySelector('.panel__textarea--edit').value = blockParent.querySelector('.block__text').innerText;
        const blockImgParent = blockParent.querySelectorAll('.block__img');
        if (blockImgParent.length > 0) {
            blockImgParent.forEach(function(item) {
                const panelImgContent = $('.ghost').querySelector('.panel__img--content-edit');
                panelImgContent.classList.remove('none');
                const panelImgContentCopy = panelImgContent.cloneNode(true);
                panelImgContent.classList.add('none');
                const panelButtonImg = $('.ghost').querySelector('.panel__button--img-edit');
                panelButtonImg.before(panelImgContentCopy);
                const panelImgLink = panelImgContentCopy.querySelector('.panel__img--link');
                panelImgLink.classList.remove('first');
                panelImgLink.value = item.src;
            })
        }
        const panelEdit = $('.ghost').querySelector('.panel__edit').cloneNode(true);
        blockParent.after(panelEdit);
        $('.buttons__menu').classList.remove('active');
        blockParent.classList.add('none');
    }
    // *---------- Main -> Block -> btnOpen(click) ----------*
    else if (event.target.classList.contains('btn__open')) {
        imgIndex = 0;
        const panelOpen = $('.panel__open');
        blockParent = event.target.parentNode;
        const blockImgParent = blockParent.querySelectorAll('.block__img');
        if (blockImgParent.length > 0) {
            blockImgParent.forEach(function(item) {
                const img = $('.ghost').querySelector('.panel__open--img');
                const imgClone = img.cloneNode();
                imgClone.src = item.src;
                $('.arrow__right').before(imgClone);
                const dotEl = $('.ghost').querySelector('.dot__el');
                const dotElClone = dotEl.cloneNode();
                $('.dots').append(dotElClone);
            })
            const panelOpenImg = panelOpen.querySelectorAll('.panel__open--img');
            panelOpenImg[0].classList.add('active');
            const dotEl = $all('.dot__el');
            dotEl[0].classList.add('active');
            if (panelOpenImg.length == 1) {
                $('.arrow__right').classList.add('none');
                $('.arrow__left').classList.add('none');
            }
            else {
                $('.arrow__left').classList.add('none');
                $('.arrow__right').classList.remove('none');
            }
            $('.panel__open--title').innerHTML = blockParent.querySelector('.block__title').innerText;
            $('.panel__open--text').innerHTML = blockParent.querySelector('.block__text').innerText;
            const commentBlock = blockParent.querySelector('.comment__block');
            let blockCopy = commentBlock.cloneNode(true);
            blockCopy.classList.remove('none');
            $('.btn__open--close').before(blockCopy);
            const commentContentWrapper = blockParent.querySelectorAll('.comment__content--wrapper');
            blockCopy = commentContentWrapper[commentContentWrapper.length - 1].cloneNode(true);
            $('.btn__open--close').before(blockCopy);
            const blockInformation = blockParent.querySelectorAll('.block__information');
            blockCopy = blockInformation[blockInformation.length - 1].cloneNode(true);
            $('.btn__open--close').before(blockCopy);
            panelOpen.classList.remove('none');
            $('body').classList.add('none');
        }
    }
    // *---------- Main -> Block -> like(click) ----------*
    else if (event.target.classList.contains('like')) {
        const elCountLike = event.target.parentNode.parentNode.querySelector('.count__like');
        let countLike = elCountLike.value;
        if (event.target.classList.contains('liked')) {
            countLike--;
            event.target.classList.remove('liked');
        }
        else {
            countLike++;
            event.target.classList.add('liked');
        }
        likeWord(event.target.parentNode.parentNode, countLike, 'like');
        elCountLike.value = countLike;
    }
    // *---------- Main -> Block -> commentLike(click) ----------*
    else if (event.target.classList.contains('comment__like')) {
        const elCountLike = event.target.parentNode.parentNode.querySelector('.comment__count--like');
        let countLike = elCountLike.value;
        if (event.target.classList.contains('liked')) {
            countLike--;
            event.target.classList.remove('liked');
        }
        else {
            countLike++;
            event.target.classList.add('liked');
        }
        likeWord(event.target.parentNode.parentNode, countLike, 'comment__like');
        elCountLike.value = countLike;
    }
    // *---------- Main -> Block -> commentContent(click) ----------*
    else if (event.target.classList.contains('comment__content')) {
        event.target.parentNode.parentNode.querySelector('.comment__block').classList.toggle('none');
        if (event.target.innerText.includes('Комментировать')) event.target.innerHTML = '0 комментириев';
        else event.target.innerHTML = 'Комментировать';
    }
    // *---------- Main -> Block -> commentBlockRemove(click) ----------*
    else if (event.target.classList.contains('comment__block--remove')) {
        const itemParent = event.target.parentNode;
        if (itemParent.classList.contains('answer')) {
            commentWord(event.target, true, true);
            answerWord(event.target, true);
        }
        else {
            commentWord(event.target, false, true);
        }
        itemParent.remove();
    }
    // *---------- Main -> Block -> newcommentButtonSend(click) ----------*
    else if (event.target.classList.contains('newcomment__button--send')) {
        const item = event.target;
        const itemParent = item.parentNode;
        const commentBlockItemCopy = $('.ghost').querySelector('.comment__block--item').cloneNode(true);
        const commentAccountName = commentBlockItemCopy.querySelector('.comment__account--name');
        commentAccountName.innerHTML = accountName();
        const commentAccountAvatar = commentBlockItemCopy.querySelector('.comment__account--avatar');
        commentAccountAvatar.style.background = randomColor();
        const commentBlockTextCopy = commentBlockItemCopy.querySelector('.comment__block--text');
        commentBlockTextCopy.innerHTML = itemParent.querySelector('.newcomment__textarea').value;
        if (itemParent.querySelector('.newcomment__textarea').value != 0) {
            if (itemParent.querySelector('.newcomment__textarea').value.includes(answerAccountName)) {
                commentBlockItemCopy.classList.add('answer');
                if (!answerComment.classList.contains('answer')) {
                    answerComment.querySelector('.comment__block--item-answer').append(commentBlockItemCopy);
                    answerWord(answerComment, false);
                }
                else {
                    answerComment.parentNode.parentNode.querySelector('.comment__block--item-answer').append(commentBlockItemCopy);
                    answerWord(answerComment.parentNode.parentNode, false);
                }
            }
            else {
                itemParent.parentNode.querySelector('.newcomment__block--item').before(commentBlockItemCopy);
            }
            commentWord(event.target, false, false);
            itemParent.querySelector('.newcomment__textarea').value = '';
        }
    }
    // *---------- Main -> Block -> newcommentButtonDelete(click) ----------*
    else if (event.target.classList.contains('newcomment__button--delete')) {
        event.target.parentNode.querySelector('.newcomment__textarea').value = '';
    }
    // *---------- Main -> Block -> CommentBlock Item -> Comment Answer(click) ----------*
    else if (event.target.classList.contains('comment__answer')) {
        answerComment = event.target.parentNode.parentNode;
        let mainParent;
        if (!answerComment.classList.contains('answer')) mainParent = event.target.parentNode.parentNode.parentNode.parentNode;
        else mainParent = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        answerAccountName = event.target.parentNode.parentNode.querySelector('.comment__account--name').innerText + ',';
        mainParent.querySelector('.newcomment__textarea').value = answerAccountName;
    }
})
const buttonsMenu = $('.buttons__menu');
// *---------- btnAdd(click) -> PanelAdd ----------*
const btnAdd = $('.btn__add');
btnAdd.addEventListener('click', function() {
    blockAddSwitch();
})
// *---------- PanelAdd ----------*
const panelAdd = $('.panel__add');
// *---------- PanelAdd -> buttonImgRemove(click) || PanelEdit -> buttonImgRemove(click) ----------*
main.addEventListener('click', function(event) {
    if (event.target.classList.contains('button__img--remove')) {
        event.target.parentNode.remove();
    }
})
// *---------- PanelAdd -> panelImgContent -> panelButtonImgAdd(click) ----------*
const panelButtonImgAdd = $('.panel__button--img-add');
const panelImgContentAdd = $('.panel__img--content-add');
panelButtonImgAdd.addEventListener('click', function() {
    panelImgContentAdd.classList.remove('none');
    const panelImgLink = $('.panel__img--link-add');
    panelImgLink.classList.remove('first');
    const panelImgContentCopy = panelImgContentAdd.cloneNode(true);
    panelImgContentAdd.classList.add('none');
    panelImgLink.classList.add('first');
    if ($all('.panel__img--content-add.copy').length < 9) {
        panelButtonImgAdd.before(panelImgContentCopy);
        panelImgContentCopy.classList.add('copy');
    }
})
// *---------- PanelAdd -> panelButtonsAdd -> btnAddOk(click) ----------*
const btnAddOk = $('.button__add--ok');
btnAddOk.addEventListener('click', function() {
    if ($('.panel__input--add').value != '' && $('.panel__textarea--add').value != '') {
        const blockCopy = $('.ghost').querySelector('.block').cloneNode(true);
        blockCopy.querySelector('.block__title').innerHTML = $('.panel__input--add').value;
        blockCopy.querySelector('.block__text').innerHTML = $('.panel__textarea--add').value;
        const blockImgContent = blockCopy.querySelector('.block__img--content');
        const panelImgLink = $all('.panel__img--link-add');
        blockImgContent.classList.add(`img${panelImgLink.length - 1}`);
        panelImgLink.forEach(function(item) {
            const blockImgCopy = $('.ghost').querySelector('.block__img').cloneNode();
            blockImgCopy.src = item.value;
            blockImgContent.append(blockImgCopy);
        })
        blockCopy.querySelectorAll('.block__img')[0].remove();
        mainContent.prepend(blockCopy);
        panelClean();
        blockAddSwitch();
    }
})
// *---------- PanelAdd -> panelButtonsAdd -> btnAddNo(click) ----------*
const btnAddNo = $('.button__add--no');
btnAddNo.addEventListener('click', function() {
    blockAddSwitch();
    panelClean();
})
// *---------- PanelOpen ----------*
const panelOpenContent = $('.panel__open--content');
panelOpenContent.addEventListener('click', function(event) {
    const panelOpenImg = $('.panel__open').querySelectorAll('.panel__open--img');
    const dotEl = $('.panel__open').querySelectorAll('.dot__el');
    if (panelOpenImg.length > 1) {
        if (event.target.classList.contains('arrow__right')) {
            panelOpenImg[imgIndex].classList.remove('active');
            dotEl[imgIndex].classList.remove('active');
            imgIndex++;
        }
        else if (event.target.classList.contains('arrow__left')) {
            panelOpenImg[imgIndex].classList.remove('active');
            dotEl[imgIndex].classList.remove('active');
            imgIndex--;
        }
        panelOpenImg[imgIndex].classList.add('active');
        if (imgIndex == panelOpenImg.length - 1) {
            $('.arrow__right').classList.add('none');
            $('.arrow__left').classList.remove('none');
        }
        else if (imgIndex == 0) {
            $('.arrow__right').classList.remove('none');
            $('.arrow__left').classList.add('none');
        }
        else {
            $('.arrow__right').classList.remove('none');
            $('.arrow__left').classList.remove('none');
        }
        dotEl[imgIndex].classList.add('active');
    }
    if (event.target.classList.contains('btn__open--close')) {
        $('.panel__open').classList.add('none');
        const panelOpenImg = $('.panel__open').querySelectorAll('.panel__open--img');
        panelOpenImg.forEach(function(item) {
            item.remove();
        })
        const dotEl = $('.panel__open').querySelectorAll('.dot__el');
        dotEl.forEach(function(item) {
            item.remove();
        })
        const commentBlock1 = event.target.parentNode.querySelector('.comment__block');
        const commentContentWrapper1 = event.target.parentNode.querySelectorAll('.comment__content--wrapper');
        const blockInformation1 = event.target.parentNode.querySelectorAll('.block__information');
        const commentBlock2 = blockParent.querySelector('.comment__block');
        let blockCopy = commentBlock1.cloneNode(true);
        commentBlock2.after(blockCopy);
        const blockInformation2 = blockParent.querySelectorAll('.block__information');
        blockCopy = blockInformation1[blockInformation1.length - 1].cloneNode(true);
        blockInformation2[blockInformation2.length - 1].after(blockCopy);
        const commentContentWrapper2 = blockParent.querySelectorAll('.comment__content--wrapper');
        blockCopy = commentContentWrapper1[commentContentWrapper1.length - 1].cloneNode(true);
        commentContentWrapper2[commentContentWrapper2.length - 1].after(blockCopy);
        commentBlock1.remove();
        commentContentWrapper1.forEach(function(item) {
            item.remove();
        });
        blockInformation1.forEach(function(item) {
            item.remove();
        })
        commentBlock2.remove();
        commentContentWrapper2[commentContentWrapper2.length - 1].remove();
        blockInformation2[blockInformation2.length - 1].remove();
        $('body').classList.remove('none');
    }
})
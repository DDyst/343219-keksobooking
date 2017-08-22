// Файл для работы с объявлениями на карте

'use strict';

var panelTemplate = document.getElementById('lodge-template').content;
var map = document.querySelector('.tokyo__pin-map');
var dialogBlock = document.getElementById('offer-dialog');

// Массив с данными объявлений
var advertisements = [
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    offer: {
      title: 'Большая уютная квартира',
      address: '350, 128',
      price: 12700,
      type: 'flat',
      rooms: 3,
      guests: 5,
      checkin: '12:00',
      checkout: '13.00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: 350,
      y: 128
    }
  }, {
    author: {
      avatar: 'img/avatars/user02.png'
    },
    offer: {
      title: 'Маленькая неуютная квартира',
      address: '710, 190',
      price: 6200,
      type: 'flat',
      rooms: 1,
      guests: 2,
      checkin: '12:00',
      checkout: '14.00',
      features: ['washer'],
      description: '',
      photos: []
    },
    location: {
      x: 710,
      y: 190
    }
  }, {
    author: {
      avatar: 'img/avatars/user03.png'
    },
    offer: {
      title: 'Огромный прекрасный дворец',
      address: '450, 365',
      price: 89900,
      type: 'house',
      rooms: 12,
      guests: 22,
      checkin: '14:00',
      checkout: '12.00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: 450,
      y: 365
    }
  }, {
    author: {
      avatar: 'img/avatars/user04.png'
    },
    offer: {
      title: 'Маленький ужасный дворец',
      address: '630, 430',
      price: 24500,
      type: 'house',
      rooms: 5,
      guests: 8,
      checkin: '13:00',
      checkout: '14.00',
      features: ['dishwasher', 'parking', 'washer'],
      description: '',
      photos: []
    },
    location: {
      x: 630,
      y: 430
    }
  }, {
    author: {
      avatar: 'img/avatars/user05.png'
    },
    offer: {
      title: 'Красивый гостевой домик',
      address: '310, 490',
      price: 19800,
      type: 'house',
      rooms: 4,
      guests: 8,
      checkin: '14:00',
      checkout: '13.00',
      features: ['wifi', 'parking', 'washer', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: 310,
      y: 490
    }
  }, {
    author: {
      avatar: 'img/avatars/user06.png'
    },
    offer: {
      title: 'Некрасивый негостеприимный домик',
      address: '865, 470',
      price: 13500,
      type: 'house',
      rooms: 3,
      guests: 6,
      checkin: '12:00',
      checkout: '13.00',
      features: ['washer'],
      description: '',
      photos: []
    },
    location: {
      x: 865,
      y: 470
    }
  }, {
    author: {
      avatar: 'img/avatars/user07.png'
    },
    offer: {
      title: 'Уютное бунгало далеко от моря',
      address: '880, 322',
      price: 10300,
      type: 'bungalo',
      rooms: 1,
      guests: 2,
      checkin: '14:00',
      checkout: '12.00',
      features: ['dishwasher', 'washer', 'conditioner'],
      description: '',
      photos: []
    },
    location: {
      x: 880,
      y: 322
    }
  }, {
    author: {
      avatar: 'img/avatars/user08.png'
    },
    offer: {
      title: 'Неуютное бунгало по колено в воде',
      address: '500, 190',
      price: 14400,
      type: 'bungalo',
      rooms: 1,
      guests: 2,
      checkin: '14:00',
      checkout: '12.00',
      features: ['washer'],
      description: '',
      photos: []
    },
    location: {
      x: 500,
      y: 190
    }
  }
];

// Функция отрисовки объявления на карте
var renderAd = function (ad) {
  var adElement = document.createElement('div');
  adElement.className = 'pin';
  adElement.style.cssText = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
  adElement.innerHTML = '<img src="' + ad.author.avatar + '" class="rounded" width="40" height="40">';
  return adElement;
};

// Функция, переводящая тип апартаментов в удобочитаемый вид
var getProperLodgeType = function (type) {
  var properType;
  if (type === 'flat') {
    properType = 'Квартира';
  } else if (type === 'bungalo') {
    properType = 'Бунгало';
  } else if (type === 'house') {
    properType = 'Дом';
  } else {
    properType = type;
  }
  return properType;
};

// Функция для преобразования строк из массива в пустые спаны с соответствующим классом
var parseFeatures = function (arr) {
  arr.forEach(function (item) {
    var featureElement = document.createElement('span');
    featureElement.className = 'feature__image feature__image--' + item;
    fragment.appendChild(featureElement);
  });
  return fragment;
};

// Функция отрисовки диалоговой панели объявления
var renderDialogPanel = function (obj) {
  var panelElement = panelTemplate.querySelector('.dialog__panel').cloneNode(true);
  panelElement.querySelector('.lodge__title').textContent = obj.offer.title;
  panelElement.querySelector('.lodge__address').textContent = obj.offer.address;
  panelElement.querySelector('.lodge__price').innerHTML = obj.offer.price + '&#x20bd;/ночь';
  panelElement.querySelector('.lodge__type').textContent = getProperLodgeType(obj.offer.type);
  panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + obj.offer.guests + ' гостей в ' + obj.offer.rooms + ' комнатах';
  panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  panelElement.querySelector('.lodge__features').appendChild(parseFeatures(obj.offer.features));
  panelElement.querySelector('.lodge__description').textContent = obj.offer.description;
  dialogBlock.replaceChild(panelElement, dialogBlock.querySelector('.dialog__panel'));
  dialogBlock.querySelector('.dialog__title img').src = obj.author.avatar;
};

// Отрисовываем все объявления из массива
var fragment = document.createDocumentFragment();
advertisements.forEach(function (item) {
  fragment.appendChild(renderAd(item));
});
map.appendChild(fragment);

renderDialogPanel(advertisements[0]);

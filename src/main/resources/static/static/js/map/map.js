var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.56669, 126.9784), //지도의 중심좌표.
	level: 10 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

var mapTypeControl = new kakao.maps.MapTypeControl(); // 지도타입 전환 컨트롤 생성
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

var zoomControl = new kakao.maps.ZoomControl(); // 확대 축소 제어 컨트롤
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);


// 주소-좌표 변환 객체를 생성
var geocoder = new kakao.maps.services.Geocoder();

var markers = [];

/* // 마커 클러스터러를 생성합니다
var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 7 // 클러스터 할 최소 지도 레벨
});*/

// 모든 마커 정보를 가져와서 출력
var xhr = new XMLHttpRequest();
xhr.open('GET', '/all');
xhr.onload = function () {
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        allFestival(data);
    }
};
xhr.send();


function allFestival(data){
    for (var i = 0; i < data.length; i++) {
        var record = data[i];
        console.log(record);
        // 클로저를 사용해서 변수를 캡처
        (function(record) {
            // 장소명과 주소로 좌표를 검색
            geocoder.addressSearch(record.festival_addr, function(result, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {

                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords,
                        image: categorization(record)
                    });
                    markers.push(marker);

                    /*clusterer.addMarkers(markers);*/

                    // 마커에 표시할 인포윈도우를 생성
                    var infowindow = new kakao.maps.InfoWindow({
                        content: getContent(record) // 인포윈도우에 표시할 내용
                    });

                    kakao.maps.event.addListener(marker, 'mouseover', clickMakerListener(map, marker, infowindow));
                    kakao.maps.event.addListener(marker, 'mouseout', clickMapListener(infowindow));

                    //-------------------------------------------------------------------------------------------
                    //사이드리스트를 html에 만들어놓고 getElementById로 가져와서 하려니깐
                    //실행순서 때문에 오류가 나는거 같아서 js로 사이드리스트를 만들어서 진행

                        /*const COUNT_PER_PAGE = 6;
                        const numberButtonWrapper = document.querySelector('.number-button-wrapper');
                        const ul = document.querySelector('ul');
                        const prevButton = document.querySelector('.prev-button');
                        const nextButton = document.querySelector('.next-button');

                        let pageNumberButtons;
                        let currentPage = 1;    // 초기 페이지번호

                        const getTotalPageCount = () => {
                          return Math.ceil(data.length / COUNT_PER_PAGE);
                        };

                        const setPageButtons = () => {
                          numberButtonWrapper.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌

                          for (let i = 1; i <= getTotalPageCount(); i++) {
                            numberButtonWrapper.innerHTML += `<span class="number-button"> ${i} </span`;
                          }

                          numberButtonWrapper.firstChild.classList.add('selected');
                          pageNumberButtons = document.querySelectorAll('.number-button');
                        };




                        const setPageOf = (pageNumber) => {
                          ul.innerHTML = ''; // ul 리스트 내부를 비워줌

                          for (
                            let i = COUNT_PER_PAGE * (pageNumber - 1) + 1;
                            i <= COUNT_PER_PAGE * (pageNumber - 1) + 6 && i <= data.length;
                            i++
                          ) {

                            const li = document.createElement('li');
                            li.id = data[i-1].festival_no;
                            console.log(li.id);
                            console.log(data[i-1].festival_no);

                            // 컨테이너
                            const postContainer = document.createElement('div');
                            postContainer.className = 'post-container';
                            // 축제 이름
                            const festival_name = document.createElement('h3');
                            festival_name.className = 'festival_name';
                            // 축제 주소
                            const festival_addr = document.createElement('p');
                            festival_addr.className = 'festival_addr';
                            // 축제 날짜
                            const festival_date = document.createElement('p');
                            festival_date.className = 'festival_date';

                            festival_name.textContent = data[i - 1].festival_name;
                            festival_addr.innerHTML = '<strong>장소 : </strong>' + data[i - 1].festival_addr; // 페이지 번호는 1부터 시작하지만 배열 인덱스는 0부터 시작하므로 -1 해 준다.
                            festival_date.innerHTML = '<strong>개최일자 : </strong>' + data[i - 1].start_date + ' ~ ' + data[i - 1].end_date;

                            postContainer.append(festival_name,festival_addr,festival_date); // 컨테이너 구성
                            li.append(postContainer); // li 구성

                            const imageContainer = document.createElement('div'); //리스트 축제정보 옆 이미지
                            imageContainer.classList.add('image_container');
                            imageContainer.style.width = '100px';
                            imageContainer.style.height = '100px';
                            imageContainer.style.flexShrink = '0';
                            imageContainer.style.marginLeft = 'auto';

                            const image = document.createElement('img');
                            var imageSrc = data[i-1].festival_image;
                            imageSrc = "/static/images/" + data[i-1].festival_no + ".jpg";
                            //console.log(imageSrc);
                            //console.log(data[i-1].festival_no);

                            image.src = imageSrc;
                            image.alt = '이미지공간';
                            image.style.width = '100px';
                            image.style.height = '100px';
                            imageContainer.append(image);
                            li.append(imageContainer);

                            ul.append(li);

                            li.addEventListener('mouseover',function(){


                                var position = marker.getPosition();    //마커의 좌표 반환
                                map.setCenter(position);
                                clickMakerListener(map, marker, infowindow)();
                            })


                            li.addEventListener('mouseout',function(){

                                clickMapListener(infowindow)();
                                console.log("실행되는거니...?");
                            })
                          }
                        };

                        const moveSelectedPageHighlight = () => {
                            const pageNumberButtons = document.querySelectorAll('.number-button');

                            pageNumberButtons.forEach((numberButton) => {
                                if (numberButton.classList.contains('selected')) {
                                    numberButton.classList.remove('selected');
                                }
                            });

                            pageNumberButtons[currentPage - 1].classList.add('selected');
                        };

                        setPageButtons();
                        setPageOf(currentPage);

                        //var pageNumberButtons = document.querySelectorAll('.number-button');

                        pageNumberButtons.forEach((numberButton) => {
                          numberButton.addEventListener('click', (e) => {
                            setPageOf(+e.target.innerHTML);
                            moveSelectedPageHighlight();
                          });
                        });

                        prevButton.addEventListener('click', () => {
                          if (currentPage > 1) {
                        		currentPage -= 1;
                            setPageOf(currentPage);
                            moveSelectedPageHighlight();
                          }
                        });

                        nextButton.addEventListener('click', () => {
                          if (currentPage < getTotalPageCount()) {
                        		currentPage += 1;
                            setPageOf(currentPage);
                            moveSelectedPageHighlight();
                          }
                        });*/


                    var li = document.createElement('li');
                    li.id = record.festival_no;

                    li.style.padding = '18px';
                    li.style.margin = '15px';
                    li.style.borderRadius = '10px';
                    li.style.border = '2px solid #d7d7d7';
                    li.style.display = 'flex';
                    li.style.alignItems = 'center';

                    // 왼쪽 div 생성
                    var contentWrapper = document.createElement('div');
                    contentWrapper.style.flexGrow = '1';
                    // 왼쪽 div 내용 추가
                    var name = document.createElement('h3');
                    name.innerText = record.festival_name;
                    name.style.fontFamily = 'Single Day';
                    name.style.fontSize = '20px';

                    var location = document.createElement('p');
                    location.innerHTML = '<strong>장소 : </strong>' + record.festival_addr;
                    location.style.fontFamily = 'NanumGothic';
                    location.style.paddingTop = '10px';
                    location.style.paddingBottom = '5px';

                    var date = document.createElement('p');
                    date.innerHTML = '<strong>개최 일자 : </strong>' + record.start_date + ' ~ ' + record.end_date;
                    date.style.fontFamily = 'NanumGothic';

                    contentWrapper.appendChild(name);
                    contentWrapper.appendChild(location);
                    contentWrapper.appendChild(date);


                    // 오른쪽 이미지 div 생성
                    var imageWrapper = document.createElement('div');
                    imageWrapper.classList.add('image-wrapper');
                    imageWrapper.style.width = '100px';
                    imageWrapper.style.height = '100px';
                    imageWrapper.style.flexShrink = '0';
                    imageWrapper.style.marginLeft = 'auto';
                    // 오른쪽 이미지 div 내용 추가
                    var image = document.createElement('img');
                    var imgUrl = record.festival_image;
                    imgUrl = "/static/images/" + record.festival_no + ".jpg";
                    image.src = imgUrl;
                    image.alt = '이미지공간';
                    image.style.width = '100px';
                    image.style.height = '100px';
                    imageWrapper.appendChild(image);

                    // 왼쪽 div과 오른쪽 이미지 div을 li에 추가
                    li.appendChild(contentWrapper);
                    li.appendChild(imageWrapper);

                    festival.appendChild(li);   //html <ul id="festival">


                    image.addEventListener('click',function(){
                        goToFestivalInfo(record.festival_no);
                    })


                    li.addEventListener('mouseover',function(){
                        var position = marker.getPosition();
                        map.setCenter(position);
                        clickMakerListener(map, marker, infowindow)();
                    })
                    li.addEventListener('mouseout',function(){
                        clickMapListener(infowindow)();
                    })


               /*     var sideList = document.getElementById('sideList');
                    sideList.id = record.festival_no;
                    sideList.addEventListener('mouseover', () => {
                    	var position = marker.getPosition();
                        map.setCenter(position);
                        clickMakerListener(map, marker, infowindow)();
                    });
                    sideList.addEventListener('mouseout', () => {
                        clickMapListener(infowindow)();
                    });*/

                }
            });
        })(record);
    }
}

/*//  지도 옆에 리스트, 페이징처리
function allFestivalList(data){
    var COUNT_PER_PAGE = 6;

    var getTotalPageCount = () => {
      return Math.ceil(data.length / COUNT_PER_PAGE);
    };

    var numberButtonWrapper = document.querySelector('.number-button-wrapper');

    var setPageButtons = () => {
      numberButtonWrapper.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌

      for (let i = 1; i <= getTotalPageCount(); i++) {
        numberButtonWrapper.innerHTML += `<span class="number-button"> ${i} </span`;
      }

      numberButtonWrapper.firstChild.classList.add('selected');
    };

    var ul = document.querySelector('ul');
    let currentPage = 1;

    var setPageOf = (pageNumber) => {
      ul.innerHTML = ''; // ul 리스트 내부를 비워줌
      var markers = [];

      for (
        let i = COUNT_PER_PAGE * (pageNumber - 1) + 1;
        i <= COUNT_PER_PAGE * (pageNumber - 1) + 6 && i <= data.length;
        i++
      ) {

        var li = document.createElement('li');
        li.id = data[i-1].festival_no;
        console.log(li.id);
        console.log(data[i-1].festival_no);

        // 컨테이너
        var postContainer = document.createElement('div');
        postContainer.className = 'post-container';
        // 축제 이름
        var festival_name = document.createElement('h3');
        festival_name.className = 'festival_name';
        // 축제 주소
        var festival_addr = document.createElement('p');
        festival_addr.className = 'festival_addr';
        // 축제 날짜
        var festival_date = document.createElement('p');
        festival_date.className = 'festival_date';

        festival_name.textContent = data[i - 1].festival_name;
        festival_addr.innerHTML = '<strong>장소 : </strong>' + data[i - 1].festival_addr; // 페이지 번호는 1부터 시작하지만 배열 인덱스는 0부터 시작하므로 -1 해 준다.
        festival_date.innerHTML = '<strong>개최일자 : </strong>' + data[i - 1].start_date + ' ~ ' + data[i - 1].end_date;

        postContainer.append(festival_name,festival_addr,festival_date); // 컨테이너 구성
        li.append(postContainer); // li 구성

        var imageContainer = document.createElement('div'); //리스트 축제정보 옆 이미지
        imageContainer.classList.add('image_container');
        imageContainer.style.width = '100px';
        imageContainer.style.height = '100px';
        imageContainer.style.flexShrink = '0';
        imageContainer.style.marginLeft = 'auto';

        var image = document.createElement('img');
        var imageSrc = data[i-1].festival_image;
        imageSrc = "/static/images/" + data[i-1].festival_no + ".jpg";
        //console.log(imageSrc);
        //console.log(data[i-1].festival_no);

        image.src = imageSrc;
        image.alt = '이미지공간';
        image.style.width = '100px';
        image.style.height = '100px';
        imageContainer.append(image);
        li.append(imageContainer);

        ul.append(li);

        console.log(data[i-1].x);
        console.log(data[i-1].y);


        var coords = new kakao.maps.LatLng(data[i-1].y, data[i-1].x);
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            image: categorization(data[i-1])
        });
        markers.push(marker);

        var infowindow = new kakao.maps.InfoWindow({
            content: getContent(data[i-1])
        });

        li.addEventListener('mouseover',function(){


            var position = marker.getPosition();    //마커의 좌표 반환
            map.setCenter(position);
            clickMakerListener(map, marker, infowindow)();
            })


        li.addEventListener('mouseout',function(){

            clickMapListener(infowindow)();
            console.log("실행되는거니...?");
        })
      }
    };

    setPageButtons();   //페이지 번호 버튼 만들기
    setPageOf(currentPage);

    var pageNumberButtons = document.querySelectorAll('.number-button');

    pageNumberButtons.forEach((numberButton) => {
      numberButton.addEventListener('click', (e) => {
        setPageOf(+e.target.innerHTML);
        moveSelectedPageHighlight();
      });
    });

    var prevButton = document.querySelector('.prev-button');
    var nextButton = document.querySelector('.next-button');

    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
    		currentPage -= 1;
        setPageOf(currentPage);
        moveSelectedPageHighlight();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentPage < getTotalPageCount()) {
    		currentPage += 1;
        setPageOf(currentPage);
        moveSelectedPageHighlight();
      }
    });

    var moveSelectedPageHighlight = () => {
      pageNumberButtons.forEach((numberButton) => {
        if (numberButton.classList.contains('selected')) {
          numberButton.classList.remove('selected');
        }
      });

      pageNumberButtons[currentPage - 1].classList.add('selected');
    };
}*/



//  축제 분류별 마커 이미지
function categorization(record){

    var markerImageSrc;
    var category = record.festival_category;
    //console.log(category);

    if(category === '문화예술'){    // /'/static/문화예술.png'
        markerImageSrc = '/static/문화예술.png';
    } else if(category === '주민화합'){
        markerImageSrc = '/static/주민화합.png';
    } else if(category === '전통역사'){
        markerImageSrc = '/static/전통역사.png';
    } else if(category === '지역특산물'){
        markerImageSrc = '/static/지역특산물.png';
    } else if(category === '생태자연'){
        markerImageSrc = '/static/생태자연.png';
    }

    var markerImageSize = new kakao.maps.Size(40, 40);

    var makerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

    return makerImage;
}


// 인포윈도우를 표시
function clickMakerListener(map, marker, infowindow) {
    return function() {

        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫기
function clickMapListener(infowindow) {
    return function () {

        infowindow.close();
    };
}

//  인포윈도우 내용
function getContent(record) {

    let result;
    const infowindow_imgURL =record.festival_imgURL;
    console.log(infowindow_imgURL);

    result = `<div class="infowindow" style="background-color: rgb(255,255,242); width: 230px; height: 230px; overflow: auto;">
                <div class="infowindow-content">
                    <h4 style="text-align:center; font-weight: bold; margin-top:15px; margin-bottom:3px;">${record.festival_name}</h4>
                </div>
                <div class="infowindow-image" style="display: flex; justify-content: center; align-items: center;">
                      <img src="${infowindow_imgURL}" class="infowindow-img" alt="이미지공간">
                </div>
              </div>`;

    // 이미지 크기를 작게 조정
    const imgStyle = "max-width: 150px; max-height: 150px;";
    result = result.replace('class="infowindow-img"', `class="infowindow-img" style="${imgStyle}; margin-top:10px;"`);

    return result;
}

//축제 디테일 페이지
function goToFestivalInfo(id){
    var detailPageUrl = '/festivalInfo/' + id;

    window.location.href = detailPageUrl;
}





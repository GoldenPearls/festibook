var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.56669, 126.9784), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

var mapTypeControl = new kakao.maps.MapTypeControl(); // 지도타입 전환 컨트롤 생성
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl(); // 확대 축소 제어 컨트롤
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);


// 주소-좌표 변환 객체를 생성
var geocoder = new kakao.maps.services.Geocoder();

var markers = [];

// 마커 클러스터러를 생성합니다
var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 7 // 클러스터 할 최소 지도 레벨
});

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

                    clusterer.addMarkers(markers);

                    // 마커에 표시할 인포윈도우를 생성
                    var infowindow = new kakao.maps.InfoWindow({
                        content: getContent(record) // 인포윈도우에 표시할 내용
                    });

                    kakao.maps.event.addListener(marker, 'mouseover', clickMakerListener(map, marker, infowindow));
                    kakao.maps.event.addListener(marker, 'mouseout', clickMapListener(infowindow));


                    //사이드리스트를 html에 만들어놓고 getElementById로 가져와서 하려니깐
                    //실행순서 때문에 오류가 나는거 같아서 js로 사이드리스트를 만들어서 진행

                    /*                    var li = document.createElement('li');
                                        li.id = record.festival_no;

                                        li.style.padding = '18px';
                                        li.style.borderTop = '1px solid rgb(204, 204, 204)';
                                        li.style.display = 'flex';
                                        li.style.alignItems = 'center';

                                        // 왼쪽 div 생성
                                        var contentWrapper = document.createElement('div');
                                        contentWrapper.style.flexGrow = '1';
                                        // 왼쪽 div 내용 추가
                                        var name = document.createElement('h3');
                                        name.innerText = record.festival_name;
                                        var location = document.createElement('p');
                                        location.innerHTML = '<strong>장소: </strong>' + record.festival_addr;
                                        var date = document.createElement('p');
                                        date.innerHTML = '<strong>개최 일자: </strong>' + record.startDate + ' ~ ' + record.endDate;

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
                                        var imgUrl = record.image;
                                        image.src = imgUrl;
                                        image.alt = '이미지공간';
                                        imageWrapper.appendChild(image);*//*

                    // 왼쪽 div과 오른쪽 이미지 div을 li에 추가
                    li.appendChild(contentWrapper);
                    li.appendChild(imageWrapper);

                    li.style.padding='18px';
                    li.style.borderTop = '1px solid #ccc';
                    festival.appendChild(li);


                    li.addEventListener('mouseover',function(){
                        var position = marker.getPosition();
                        map.setCenter(position);
                        clickMakerListener(map, marker, infowindow)();
                    })
                    li.addEventListener('mouseout',function(){
                        clickMapListener(infowindow)();
                    })*/




                    var sideList = document.getElementById('sideList');
                    sideList.id = record.festival_no;
                    sideList.addEventListener('mouseover', () => {
                        var position = marker.getPosition();
                        map.setCenter(position);
                        clickMakerListener(map, marker, infowindow)();
                    });
                    sideList.addEventListener('mouseout', () => {
                        clickMapListener(infowindow)();
                    });

                }
            });
        })(record);
    }
}

function categorization(record){

    var markerImageSrc;
    var category = record.festival_category;
    console.log(category);

    if(category === '문화예술'){
        markerImageSrc = 'https://cdn4.iconfinder.com/data/icons/stay-at-home-color/48/Playing_music-128.png';
    } else if(category === '주민화합'){
        markerImageSrc = 'https://cdn3.iconfinder.com/data/icons/wedding-day-color/48/Ijab_Qobul-128.png';
    } else if(category === '전통역사'){
        markerImageSrc = 'https://cdn2.iconfinder.com/data/icons/online-learning-color/48/Idea_Bulb_Mortagboard-128.png';
    } else if(category === '지역특산물'){
        markerImageSrc = 'https://cdn4.iconfinder.com/data/icons/farming-color/48/Fruit_basket-128.png';
    } else if(category === '생태자연'){
        markerImageSrc = 'https://cdn4.iconfinder.com/data/icons/farming-color/48/Growing_Tree-128.png';
    }

    var markerImageSize = new kakao.maps.Size(35, 35);
    var makerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

    return makerImage;
}


// 인포윈도우를 표시하는 클로저를 만드는 함수
function clickMakerListener(map, marker, infowindow) {
    return function() {

        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수
function clickMapListener(infowindow) {
    return function () {

        infowindow.close();
    };
}

function getContent(record) {

    let result;

    result = `<div class="infowindow" style="width: 200px; height: 50px;">
                <div class="infowindow-body">
                    <h4 class="infowindow-title">${record.festival_name}</h4>
                </div>
            </div>`;


    //이름을 가운데로 정렬
    const titleStyle = "text-align: center;";
    result = result.replace('class="infowindow-title"', `class="infowindow-title" style="${titleStyle}; margin-top:10px; margin-bottom:10px;"`);

    return result;
}





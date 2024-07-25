document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const subId = urlParams.get("subId");

  let direction = "";
  let carMoving = false;
  let activeModal = "";
  let rightMovement = 0;
  let userMoves = [];
  let isStarrable = false;

  const starMoves = [
    {
      index: 47,
      moves: ["up", "up"],
    },
    {
      index: 107,
      moves: ["up", "right"],
    },
    {
      index: 167,
      moves: ["up", "down"],
    },
    {
      index: 227,
      moves: ["down", "up"],
    },
    {
      index: 347,
      moves: ["down", "right"],
    },
    {
      index: 407,
      moves: ["down", "down"],
    },
  ];

  const root = document.getElementById("root");
  const randomIndex = Math.floor(Math.random() * starMoves.length);
  const randomCellIndex = starMoves[randomIndex].index;

  const maze = document.getElementById("maze");

  let path = [];

  const fetchGifts = async () => {
    try {
      const res = await fetch(`/api/get_user_wish_list?sub_id=${subId}`);
      const data = await res.json();
      console.log("🚀 ~ file: index.js:77 ~ fetchGifts ~ data:", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const sendWishes = async () => {
    try {
      const res = await fetch(`/api/send_wishes?sub_id=${subId}`);
      const data = await res.json();
      console.log("🚀 ~ file: index.js:77 ~ fetchGifts ~ data:", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const addCoupon = async () => {
    try {
      const res = await fetch(`/api/add_coupon?sub_id=${subId}`);
      const data = await res.json();
      console.log("🚀 ~ file: index.js:77 ~ fetchGifts ~ data:", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const checkStarLimit = async () => {
    try {
      const res = await fetch(`/api/getLimit`);
      const data = await res.json();
      if (data.message == "Okay") {
        drawStar();
        isStarrable = true;
      } else {
        isStarrable = false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  let userInventory = await fetchGifts();
  const drawStatusBar = async () => {
    const coupon = document.getElementById("coupons");
    if (userInventory.wish_list.length === 0) {
      coupon.innerHTML = "0";
    } else {
      coupon.innerHTML = userInventory.wish_list[0].gift_voucher;
    }

    const star = document.getElementById("stars");
    star.innerHTML = userInventory.total_voucher;
  };
  drawStatusBar();

  const drawStar = () => {
    const star = document.createElement("img");
    star.src = "../assets/spring/star.gif";
    const starCell = maze.querySelector(`[data-index="${randomCellIndex}"]`);
    starCell.innerHTML = "";
    star.classList.add("star");
    starCell.appendChild(star);
  };

  const drawStarFound = () => {
    const modal = document.getElementById("customDialog");
    modal.style.display = "flex";
    modal.innerHTML = "";
    modal.innerHTML = `<div
          style="
            width: 35vw;
            background-color: rgba(43, 32, 55, 0.9);
            border-radius: 30px;
            backdrop-filter: blur(5px);
            margin-top: 10vh;
            display: flex;
            color: white;
            justify-content: center;
            align-items: center;
            padding: 3rem;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 2rem;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 4rem;

              "
            >
              <img
                src="../assets/spring/star.gif"
                alt=""
                style="
                  height: 8rem;
                  position:absolute;
                  width: 8rem;
                  object-fit: contain;
                  border-radius: 10px;
                "
              />

            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 1rem;
                text-align:center;
                margin-top:1rem;
                margin-bottom:1rem;
                align-items: center;
                font-size: 1.5rem /* 30px */;
                  font-weight: 600;
              "
            >
              Баяр хүргэе! Танд ахин тоглоом тоглох 1 эрх нэмэгдлээ.
              <br>
              <br>
              Супер тохирол 2024.05.29-ны өдөр Univision Mongolia facebook хуудсаар шууд дамжуулна.
            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 2rem;
                align-items: center;
              "
            >
              <div
                style="
                  padding-left: 4rem;
                  text-align: center;
                  width: 40%;
                  border-radius: 20px;
                  padding-right: 4rem;
                  padding-top: 0.75rem /* 12px */;
                  padding-bottom: 0.75rem /* 12px */;
                  background-color: #532DC2;
                  font-size: 1.5rem /* 30px */;
                  font-weight: 700;
                  color: white;
                "
              >
                Буцах
              </div>
            </div>
          </div>
        </div>`;
  };
  const drawSendModalError = () => {
    const modal = document.getElementById("customDialog");
    modal.style.display = "flex";
    modal.innerHTML = "";
    modal.innerHTML = `<div
          style="
            width: 35vw;
            background-color: rgba(43, 32, 55, 0.9);
            border-radius: 30px;
            backdrop-filter: blur(5px);
            margin-top: 10vh;
            color:white;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3rem;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 2rem;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                width: 4rem;

              "
            >
              <img
                src="../assets/sendError.png"
                alt=""
                style="
                  height: 4rem;
                  width: 4rem;
                  object-fit: contain;
                  border-radius: 10px;
                "
              />

            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 1rem;
                text-align:center;
                margin-top:1rem;
                margin-bottom:1rem;
                align-items: center;
                font-size: 1.5rem /* 30px */;
                  font-weight: 600;
              "
            >
              Танд урамшууллын эрх байхгүй байна. Та "RAV4-тэй кино" цэсээс хүссэн киногоо түрээслэх бүрд 2 эрх, кино багцаас идэвхжүүлэх бүрд 3 эрхтэй болох боломжтой.
            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 2rem;
                align-items: center;
              "
            >
              <div
                style="
                  padding-left: 4rem;
                  text-align: center;
                  width: 40%;
                  border-radius: 20px;
                  padding-right: 4rem;
                  padding-top: 0.75rem /* 12px */;
                  padding-bottom: 0.75rem /* 12px */;
                  background-color: #532DC2;
                  font-size: 1.5rem /* 30px */;
                  font-weight: 700;
                  color: white;
                "
              >
                Буцах
              </div>
            </div>
          </div>
        </div>`;
  };
  const drawSendModalSuccess = () => {
    const modal = document.getElementById("customDialog");
    modal.style.display = "flex";
    modal.innerHTML = "";
    modal.innerHTML = `<div
          style="
            width: 35vw;
            background-color: rgba(43, 32, 55, 0.9);
            border-radius: 30px;
            backdrop-filter: blur(5px);
            margin-top: 10vh;
            display: flex;
            color: white;
            justify-content: center;
            align-items: center;
            padding: 3rem;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 2rem;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 4rem;

              "
            >
              <img
                src="../assets/sendSuccess.png"
                alt=""
                style="
                  height: 4rem;
                  width: 4rem;
                  object-fit: contain;
                  border-radius: 10px;
                "
              />

            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 1rem;
                text-align:center;
                margin-top:1rem;
                margin-bottom:1rem;
                align-items: center;
                font-size: 1.5rem /* 30px */;
                  font-weight: 600;
              "
            >
              Баяр хүргэе! Супер бэлгийн тохиролд оролцох 1 эрх нэмэгдлээ.
              <br>
              <br>
              Супер тохирол 2024.05.29-ны өдөр Univision Mongolia facebook хуудсаар шууд дамжуулна.
            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 2rem;
                align-items: center;
              "
            >
              <div
                style="
                  padding-left: 4rem;
                  text-align: center;
                  width: 40%;
                  border-radius: 20px;
                  padding-right: 4rem;
                  padding-top: 0.75rem /* 12px */;
                  padding-bottom: 0.75rem /* 12px */;
                  background-color: #532DC2;
                  font-size: 1.5rem /* 30px */;
                  font-weight: 700;
                  color: white;
                "
              >
                Буцах
              </div>
            </div>
          </div>
        </div>`;
  };
  const generateMaze = (rows, columns) => {
    let cellIndex = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cell = document.createElement("div");
        cell.classList.add("emptyCell");
        cell.dataset.index = cellIndex;
        maze.appendChild(cell);
        cellIndex++;
      }
    }

    const roadIndices = [
      40, 41, 42, 43, 44, 45, 46, 47, 48, 70, 78, 95, 96, 97, 98, 99, 100, 101,
      102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116,
      125, 130, 141, 155, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
      171, 185, 210, 211, 212, 213, 214, 215, 222, 223, 224, 225, 226, 227, 228,
      229, 230, 231, 232, 233, 234, 235, 236, 245, 252, 275, 282, 305, 312, 335,
      336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350,
      351, 352, 353, 354, 355, 356, 372, 380, 402, 403, 404, 405, 406, 407, 408,
      409, 410,
    ];

    roadIndices.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      if (cell) {
        cell.classList.add("roadCell");
      }
    });

    const rightRoads = () => {
      const roads = roadIndices.filter((index, i, arr) => {
        const before = arr.includes(index - 1);
        const after = arr.includes(index + 1);
        return before && after;
      });

      return roads;
    };
    const horizontalRoads = rightRoads();
    horizontalRoads.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      const image = document.createElement("img");
      image.src = "../assets/spring/straight.webp";
      image.classList.add("roadImage");
      cell.innerHTML = "";
      if (cell) {
        cell.style.boxShadow =
          "inset 0 2px 0 0 #B4B4B8, inset 0 -2px 0 0 #B4B4B8";
        cell.appendChild(image);
      }
    });

    const leftTopBorderRadius = [40, 95, 222];
    leftTopBorderRadius.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      const image = document.createElement("img");
      image.src = "../assets/spring/topLeft.webp";
      image.classList.add("roadImage");
      cell.innerHTML = "";
      if (cell) {
        cell.style.borderTopLeftRadius = "100%";
        cell.style.boxShadow = "inset 2px 2px 0 0 #B4B4B8";
        cell.appendChild(image);
      }
    });

    const rightTopBorderRadius = [48, 116, 236, 356];
    rightTopBorderRadius.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      const image = document.createElement("img");
      image.classList.add("roadImage");
      image.src = "../assets/spring/topRight.webp";
      cell.innerHTML = "";
      if (cell) {
        cell.style.borderTopRightRadius = "100%";
        cell.style.boxShadow = "inset -2px 2px 0 0 #B4B4B8";
        cell.appendChild(image);
      }
    });

    const leftBottomBorderRadius = [160, 335, 402];
    leftBottomBorderRadius.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      const image = document.createElement("img");
      image.classList.add("roadImage");
      image.src = "../assets/spring/bottomLeft.webp";
      cell.innerHTML = "";
      if (cell) {
        cell.style.borderBottomLeftRadius = "100%";
        cell.style.boxShadow = "inset 2px -2px 0 0 #B4B4B8";
        cell.appendChild(image);
      }
    });

    const rightBottomBorderRadius = [171, 356, 410, 236, 116];
    rightBottomBorderRadius.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      const image = document.createElement("img");
      image.src = "../assets/spring/bottomRight.webp";
      image.classList.add("roadImage");
      cell.innerHTML = "";
      if (cell) {
        cell.style.borderBottomRightRadius = "100%";
        cell.style.boxShadow = "inset -2px -2px 0  0 #B4B4B8";
        cell.appendChild(image);
      }
    });

    const combinationArray = [
      ...rightBottomBorderRadius,
      ...leftBottomBorderRadius,
      ...rightTopBorderRadius,
      ...leftTopBorderRadius,
      ...horizontalRoads,
    ];

    const verticalRoads = roadIndices
      .filter((element) => !combinationArray.includes(element))
      .concat(
        combinationArray.filter((element) => !roadIndices.includes(element))
      );

    verticalRoads.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      const image = document.createElement("img");
      image.src = "../assets/spring/up.webp";
      image.classList.add("roadImage");
      cell.innerHTML = "";
      if (cell) {
        cell.style.boxShadow =
          "inset 2px 0 0 0 #B4B4B8, inset -2px 0 0 0 #B4B4B8";
        cell.appendChild(image);
      }
    });

    const firstIntersection = maze.querySelector(`[data-index="215"]`);
    firstIntersection.style.boxShadow = "inset -2px 0 0 0 #B4B4B8";
    const firstIntersectionImage = document.createElement("img");
    firstIntersectionImage.src = "../assets/spring/intersection2.webp";
    firstIntersectionImage.classList.add("roadImage");
    firstIntersection.innerHTML = "";
    firstIntersection.appendChild(firstIntersectionImage);

    const start = maze.querySelector(`[data-index="210"]`);
    start.style.boxShadow = "inset 0 -2px 0 0 #B4B4B8, inset 0 2px 0 0 #B4B4B8";
    const startimage = document.createElement("img");
    startimage.classList.add("roadImage");
    startimage.src = "../assets/spring/straight.webp";
    start.innerHTML = "";
    start.appendChild(startimage);

    const secondIntersection = maze.querySelector(`[data-index="108"]`);
    const secondIntersectionImage = document.createElement("img");
    secondIntersectionImage.src = "../assets/spring/intersectionTop2.webp";
    secondIntersectionImage.classList.add("roadImage");
    secondIntersection.innerHTML = "";
    secondIntersection.appendChild(secondIntersectionImage);
    secondIntersection.style.boxShadow = "inset 0 -2px 0 0 #B4B4B8";

    const thirdIntersection = maze.querySelector(`[data-index="350"]`);
    const thirdIntersectionImage = document.createElement("img");
    thirdIntersectionImage.classList.add("roadImage");
    thirdIntersectionImage.src = "../assets/spring/intersectionBottom2.webp";
    thirdIntersection.innerHTML = "";
    thirdIntersection.appendChild(thirdIntersectionImage);
    thirdIntersection.style.boxShadow = "inset 0 2px 0 0 #B4B4B8";

    const fourthIntersection = maze.querySelector(`[data-index="111"]`);
    const fourthIntersectionImage = document.createElement("img");
    fourthIntersectionImage.classList.add("roadImage");
    fourthIntersectionImage.src = "../assets/spring/intersectionBottom2.webp";
    fourthIntersection.innerHTML = "";
    fourthIntersection.appendChild(fourthIntersectionImage);
    fourthIntersection.style.boxShadow = "inset 0 2px 0 0 #B4B4B8";

    const intersections = [100, 342];
    intersections.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      const image = document.createElement("img");
      image.src = "../assets/spring/intersection3.webp";
      image.classList.add("roadImage");
      cell.innerHTML = "";
      if (cell) {
        cell.style.boxShadow = "inset 0 0 0 0 #B4B4B8, inset 0 0 0 0 #B4B4B8";
        cell.appendChild(image);
      }
    });

    const rearEnds = [116, 236, 356];
    rearEnds.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      const image = document.createElement("img");
      image.src = "../assets/spring/straight.webp";
      image.classList.add("roadImage");
      cell.innerHTML = "";
      if (cell) {
        cell.style.boxShadow = "inset 0 0 0 0 #B4B4B8, inset 0 0 0 0 #B4B4B8";
        cell.appendChild(image);
      }
    });

    const addHouse = (cell, imageUrl, className) => {
      const houseImage = document.createElement("img");
      houseImage.src = imageUrl;
      houseImage.alt = "hello world";
      houseImage.classList.add(className);
      cell.appendChild(houseImage);
    };
    const addFlower = (imageUrl, className) => {
      const flowerImage = document.createElement("img");
      flowerImage.src = imageUrl;
      flowerImage.alt = "hello world";
      flowerImage.classList.add(className);
      const cell = maze.querySelector(`[data-index="10"]`);
      cell.appendChild(flowerImage);
    };

    const houseClasses = [
      "house1",
      "house2",
      "house3",
      "house4",
      "house5",
      "house6",
      "house7",
      "house8",
      "house9",
      "sb",
    ];

    const houseIndices = [151, 153, 80, 331, 332, 307, 308, 321, 322, 190];
    const houseImageUrls = [
      "../assets/spring/Building2.webp",
      "../assets/spring/Building1.webp",
      "../assets/spring/Building5.webp",
      "../assets/spring/Building6.webp",
      "../assets/spring/Building3.webp",
      "../assets/spring/Building4.webp",
      "../assets/spring/Building5.webp",
      "../assets/spring/Building2.webp",
      "../assets/spring/Building5.webp",
      "../assets/spring/SB.png",
    ];

    houseIndices.forEach((index, i) => {
      const houseCell = maze.querySelector(`[data-index="${index}"]`);
      addHouse(houseCell, houseImageUrls[i], houseClasses[i]);
    });

    const flowerImageUrls = [
      "../assets/spring/Tree1.webp",
      "../assets/spring/Tree2.webp",
      "../assets/spring/Tree3.webp",
      "../assets/spring/Tree4.webp",
    ];

    for (let i = 1; i < 20; i++) {
      addFlower(flowerImageUrls[i % flowerImageUrls.length], `flower${i}`);
    }
    checkStarLimit();
  };
  generateMaze(15, 30);
  const drawGifts = () => {
    const gift1 = document.getElementById("gift1");
    const gift2 = document.getElementById("gift2");
    const gift3 = document.getElementById("gift3");

    if (userMoves[0] == "up") {
      gift1.src = "../assets/spring/gift.png";
      gift3.src = "../assets/sendError.png";
      gift2.src = "../assets/spring/gift.png";
    } else if (userMoves[0] == "down") {
      gift3.src = "../assets/spring/gift.png";
      gift1.src = "../assets/sendError.png";
      gift2.src = "../assets/spring/gift.png";
    }
  };
  const movements = {
    movements: ["right", "right", "right", "right", "right"],
    up: {
      movements: [
        "up",
        "up",
        "up",
        "up",
        "right",
        "right",
        "right",
        "right",
        "right",
      ],
      up: {
        movements: [
          "up",
          "up",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "down",
          "down",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
        ],
      },
      down: {
        movements: [
          "down",
          "down",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "up",
          "up",
          "right",
          "right",
          "right",
          "right",
          "right",
        ],
      },
      straight: {
        movements: [
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
        ],
      },
    },
    down: {
      movements: [
        "down",
        "down",
        "down",
        "down",
        "right",
        "right",
        "right",
        "right",
        "right",
        "right",
        "right",
      ],
      up: {
        movements: [
          "up",
          "up",
          "up",
          "up",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
        ],
      },
      down: {
        movements: [
          "down",
          "down",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "up",
          "up",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
        ],
      },
      straight: {
        movements: [
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
          "right",
        ],
      },
    },
  };
  const car = document.getElementById("carRoad");
  let carPositionX = 0;
  let carPositionY = 0;
  let carCurrentRotation = 0;

  const moveCar = (movement) => {
    console.log("moveCar");
    car.style.transition = "transform 0.3s linear";
    const translationAmount = 4;

    switch (movement) {
      case "up":
        if (carCurrentRotation !== 90) {
          carCurrentRotation = -90;
        }
        carPositionY -= translationAmount;
        break;

      case "down":
        if (carCurrentRotation !== -90) {
          carCurrentRotation = 90;
        }
        carPositionY += translationAmount;
        break;

      case "right":
        if (carCurrentRotation !== 0) {
          carCurrentRotation = 0;
        }
        carPositionX += translationAmount;
        rightMovement++;

        if (rightMovement == 13) {
          maze.style.transition = "transform 2s ease-in-out";
          maze.style.transform = "translate(-50%, 0px)";
          sendWishes();
        }

        if (rightMovement === 26) {
          if (
            JSON.stringify(userMoves) ==
              JSON.stringify(starMoves[randomIndex].moves) &&
            isStarrable
          ) {
            setTimeout(() => {
              addCoupon();
              drawStarFound();
              activeModal = "sendModalSuccess";
            }, 700);
          } else {
            setTimeout(() => {
              drawSendModalSuccess();
              activeModal = "sendModalSuccess";
            }, 700);
          }
        }
        break;
    }

    console.log(carCurrentRotation);
    car.style.transform = `translate(${carPositionX}vh, ${carPositionY}vh) rotate(${carCurrentRotation}deg)`;
  };
  const arrow1 = document.getElementById("arrow1");
  const arrow3 = document.getElementById("arrow3");
  const arrow2 = document.getElementById("arrow2");

  const carMovement = async (movements) => {
    console.log("carMovement");
    carMoving = true;
    arrow1.style.display = "none";
    arrow3.style.display = "none";
    arrow2.style.display = "none";
    arrow1.style.opacity = "100%";
    arrow3.style.opacity = "100%";
    arrow2.style.opacity = "100%";
    for (const movement of movements) {
      await new Promise((resolve) => {
        setTimeout(() => {
          moveCar(movement);
          resolve();
        }, 300);
      });
    }
    if (userMoves.length == 0) {
      arrow1.style.display = "block";
      arrow1.style.left = "21vh";
      arrow1.style.bottom = "29vh";
      arrow3.style.display = "block";
      arrow3.style.left = "21vh";
      arrow3.style.bottom = "17vh";
      arrow2.style.display = "none";
    }
    if (userMoves.length == 1) {
      arrow1.style.display = "block";
      arrow3.style.display = "block";
      arrow2.style.display = "block";
      if (userMoves[0] == "up") {
        arrow1.style.left = "41vh";
        arrow1.style.bottom = "45vh";
        arrow3.style.left = "41vh";
        arrow3.style.bottom = "33vh";
        arrow2.style.left = "46vh";
        arrow2.style.bottom = "41vh";
      } else if (userMoves[0] == "down") {
        arrow1.style.left = "49vh";
        arrow1.style.bottom = "13vh";
        arrow3.style.left = "49vh";
        arrow3.style.bottom = "1vh";
        arrow2.style.left = "54vh";
        arrow2.style.bottom = "9vh";
      }
    }
    carMoving = false;
  };

  window.addEventListener("popstate", function (event) {
    if (activeModal === "") {
      location.reload();
    } else if (activeModal !== "") {
      document.getElementById("customDialog").style.display = "none";
      activeModal = "";
    }
  });

  document.addEventListener("keydown", async (event) => {
    if (carMoving == false) {
      switch (event.key) {
        case "Enter":
          if (activeModal != "") {
            location.reload();
          }
          if (userInventory.total_voucher == 0) {
            drawSendModalError();
            activeModal = "sendModalError";
            return;
          }
          const carStart = document.getElementById("carStart");
          carStart.style.display = "none";
          car.style.display = "block";
          if (path.length === 0) {
            path = movements.movements;
            carMovement(path);
          } else if (path == movements.up.movements && direction == "") {
            path = movements.up.straight.movements;
            userMoves.push("right");
            carMovement(path);
          } else if (path == movements.down.movements && direction == "") {
            path = movements.down.straight.movements;
            userMoves.push("right");
            carMovement(path);
          } else if (direction === "up") {
            drawGifts();
            userMoves.push("up");
            if (path == movements.up.movements) {
              path = movements.up.up.movements;
            } else if (path == movements.down.movements) {
              path = movements.down.up.movements;
            } else {
              path = movements.up.movements;
            }
            carMovement(path);
          } else if (direction === "down") {
            drawGifts();
            userMoves.push("down");
            if (path == movements.down.movements) {
              path = movements.down.down.movements;
            } else if (path == movements.up.movements) {
              path = movements.up.down.movements;
            } else {
              path = movements.down.movements;
            }
            carMovement(path);
          }
          break;

        case "ArrowUp":
          direction = "up";
          arrow1.style.opacity = "100%";
          arrow2.style.opacity = "20%";
          arrow3.style.opacity = "20%";
          break;

        case "ArrowDown":
          direction = "down";
          arrow1.style.opacity = "20%";
          arrow3.style.opacity = "100%";
          arrow2.style.opacity = "20%";
          break;

        case "ArrowRight":
          direction = "";
          arrow1.style.opacity = "20%";
          arrow3.style.opacity = "20%";
          arrow2.style.opacity = "100%";
          break;
      }
      console.log(userMoves);
      console.log(starMoves[randomIndex].moves);
    }
  });
});

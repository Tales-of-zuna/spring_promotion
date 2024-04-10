document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const subId = urlParams.get("subId");

  let activeModal = "";

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

  let userInventory = await fetchGifts();

  const drawActiveModal = () => {};
  const generateMaze = (rows, columns) => {
    const maze = document.getElementById("maze");
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

    const leftTopBorderRadius = [40, 95, 222];
    leftTopBorderRadius.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      if (cell) {
        cell.style.borderTopLeftRadius = "100%";
      }
    });

    const rightTopBorderRadius = [48, 116, 236, 356];
    rightTopBorderRadius.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      if (cell) {
        cell.style.borderTopRightRadius = "100%";
      }
    });

    const leftBottomBorderRadius = [160, 335, 402];
    leftBottomBorderRadius.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      if (cell) {
        cell.style.borderBottomLeftRadius = "100%";
      }
    });

    const rightBottomBorderRadius = [171, 356, 410, 236, 116];
    rightBottomBorderRadius.forEach((index) => {
      const cell = maze.querySelector(`[data-index="${index}"]`);
      if (cell) {
        cell.style.borderBottomRightRadius = "100%";
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
    ];

    const houseIndices = [151, 153, 80, 331, 332, 307, 308, 321, 322];
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
  };

  generateMaze(15, 30);

  window.addEventListener("popstate", function (event) {
    if (activeModal === "") {
      location.reload();
    } else if (activeModal !== "") {
      document.getElementById("customDialog").style.display = "none";
      activeModal = "";
    }
  });
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "Enter":
        console.log("enter");
        break;

      case "ArrowUp":
        console.log("up");
        break;

      case "ArrowDown":
        console.log("down");
        break;
    }
  });
});

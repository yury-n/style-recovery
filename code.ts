const fixes = {};

// const fillStyleId = figma.currentPage.selection[0]["fillStyleId"];
// fillStyleId && console.log("fillStyleId", fillStyleId);
// const strokeStyleId = figma.currentPage.selection[0]["strokeStyleId"];
// strokeStyleId && console.log("strokeStyleId", strokeStyleId);
// figma.currentPage.selection[0]["fills"] = [];
// figma.currentPage.selection[0]["fillStyleId"] = null;

// 22830:330105
// console.log("id", figma.currentPage.selection[0]["id"]);

// const fillStyleId = figma.currentPage.selection[0]["fillStyleId"];
// fillStyleId && console.log("fillStyleId", fillStyleId);
// const strokeStyleId = figma.currentPage.selection[0]["strokeStyleId"];
// strokeStyleId && console.log("strokeStyleId", strokeStyleId);

// 4c7db22717863ce7c68189d75ba54f18723c0481

// figma
//   .importStyleByKeyAsync("af57bb2d5eed62a3aa8c01282b23dd814de8c3d0")
//   .then((style) => {
//     figma.currentPage.selection[0]["fillStyleId"] = style.id;
//     console.log("done");
//   });

// let node = figma.currentPage.findOne(
//   (n) =>
//     n.id ===
//     "I26429:355974;26384:359207;25196:367779;25847:355543;22830:331316;22704:327175;413:180"
// );
// figma.currentPage.selection = [node];
// figma.viewport.scrollAndZoomIntoView([node]);

// Library
const brokenToWorkingStyleId = {
  d8ae12c0b0046098a0f214e0e5abf6495dea924e:
    "fe3bfda22784624ebc72547c3e526d0e1ca315cb",
  "18a985f4b1101e073271d5fa03ac4d2f539d0ccd":
    "5ec24d05c4efa98ac2ff9cdee6857b7f0405063e",
  "19e831bbabd583dcc6206cf96d65c51327456336":
    "fd656735b86b49267988cc53ad10827d9a47b7bb",
  "6523715b284e8f1d83aebadc7c8ce59bcf2137e2":
    "ab6827d4e2d7c06ab4dae4b1876bdb139fa85100",
  "33d8ce3c082bb23d23e4256016944b2a293c074e":
    "0bd8b8de81f606f927efe9b3228925f5ffbdba98",
  "88ee31cc2a490364aff0fb7447374099f0bfd4fb":
    "13375713e3901ee5214d164a4a9e31a7fd3a7eed",
  fe16b44fb1716b249c637ebd9e3fd0267675cd1d:
    "63e72c497fa75f2af2b59931910782c539d7da2b",
  c36c9b72400242c94b98100aaca4225baea4f6e0:
    "af57bb2d5eed62a3aa8c01282b23dd814de8c3d0",
  bb5f389cdc643ec9627e10bac1ea558a9eed9403:
    "1992330df46952f14e71cb15785a62976f8d89e2",
  "981900c8eb2f7c54311731d4413455017d45d462":
    "4c7db22717863ce7c68189d75ba54f18723c0481",
  "319dd5cf2a088cb8319f4a574b7a7ebab09cb14c":
    "7e82cefd2a139615513b5cb9899663a2f26a4e7c",
  "3f97bc09911e343e57c30f2c9838f8f4bedb9c06":
    "b2072b5c73acff740cb6b392df7f5d360d733d7b",
  "7234c71275680c67b30d121961bb60e5c15ff298":
    "226ed7e8e6ac3f112dcc8a379001c52992481a9f",
  "115304dfd0242da8554621b59d8f0e9c0e89098f":
    "302b56b4201d9b861bd6aea326400b37e5ff75d6",
};

let fixesCount = 0;
const generatedFixes = {};

function applyFixToNode(node) {
  // if (fixesCount > 3) return;
  if (node.children) {
    node.children.forEach(applyFixToNode);
  }
  const { id, fillStyleId } = node;
  if (!fillStyleId) {
    return;
  }
  if (typeof fillStyleId["split"] !== "function") {
    return;
  }
  const fillStyleKey = fillStyleId.split(":")[1].split(",")[0];

  if (fillStyleKey && brokenToWorkingStyleId[fillStyleKey]) {
    const workingStyleKey = brokenToWorkingStyleId[fillStyleKey];
    if (fetchedStyles[workingStyleKey]) {
      node.fillStyleId = fetchedStyles[workingStyleKey].id;
    } else {
      console.log("no style fetched", { fillStyleKey });
    }
    fixesCount++;
  }
}

const fetchedStyles = {};

async function fetchStyle(styleKey): Promise<null> {
  const style = await figma.importStyleByKeyAsync(styleKey);
  fetchedStyles[styleKey] = style;
  console.log("fetchedStyle");
  return new Promise((resolve) => resolve(null));
}

async function fetchAllStyles() {
  const requiredStyles = [...new Set(Object.values(brokenToWorkingStyleId))];
  const promises = requiredStyles.map(fetchStyle);
  return await Promise.all(promises);
}

async function applyFixes() {
  await fetchAllStyles();
  console.log({ fetchedStyles });
  if (figma.currentPage.selection.length) {
    figma.currentPage.selection.forEach(applyFixToNode);
  } else {
    figma.currentPage.children.forEach(applyFixToNode);
  }
  console.log("done");
  figma.closePlugin();
}

applyFixes();

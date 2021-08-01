export function checkCategory(product, setState) {
  if (product) {
    switch (product.category) {
      case 1:
        setState("의류");
        break;
      case 2:
        setState("신발");
        break;
      case 3:
        setState("모자");
        break;
      case 4:
        setState("전자제품");
        break;
      case 5:
        setState("액세서리");
        break;
      case 6:
        setState("기타");
        break;
      default:
        console.log("doesn't match");
    }
  }
}

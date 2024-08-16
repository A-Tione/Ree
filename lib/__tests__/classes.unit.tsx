import classes, {scopedClassMaker} from "../helpers/classes";

describe("classes", () => {
  it("接受 1 个 className", () => {
    const result = classes("a");
    expect(result).toEqual("a");
  });
  it("接受 2 个 className", () => {
    const result = classes("a", "b");
    expect(result).toEqual("a b");
  });
  it("接受 undefined", () => {
    const result = classes("a", undefined);
    expect(result).toEqual("a");
  });
  it("接受各种奇怪值", () => {
    const result = classes("a", undefined, "中文");
    expect(result).toEqual("a 中文");
  });
  it("接受 0 个参数", () => {
    const result = classes();
    expect(result).toEqual("");
  });
})

describe('scopedClassMaker', () => {
  it('接受字符串或者对象', () => {
    const sc = scopedClassMaker('ree-layout')
    expect(sc('')).toEqual('ree-layout')
    expect(sc('x')).toEqual('ree-layout-x')
    expect(sc({x: true, y: false})).toEqual('ree-layout-x')
    expect(sc({z: true, x: true})).toEqual('ree-layout-z ree-layout-x')
    expect(sc({y: true, z: true}, {extra: 'red green'})).toEqual('ree-layout-y ree-layout-z red green')
  })
})
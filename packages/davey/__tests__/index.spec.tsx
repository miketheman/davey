import { davey } from "davey";

describe("Basic single element", () => {
  const ComponentJsx = <h1>hello</h1>;
  const ComponentFn = davey("h1", null, "hello");

  test("jsx === function", () => {
    expect(ComponentJsx).toEqual(ComponentFn);
  });
  [ComponentJsx, ComponentFn].forEach(Component => {
    test("match snapshot", () => {
      expect(Component).toMatchSnapshot();
    });
    test("returns tuple", () => {
      expect(Array.isArray(Component)).toBe(true);
    });
    test("first element of tuple is tag", () => {
      expect(Component[0]).toBe("h1");
    });
    test("second element of tuple is props object", () => {
      expect(typeof Component[1]).toBe("object");
    });
    test("second element of tuple has children", () => {
      expect(Component[1]).toHaveProperty("children");
    });
    test("children are an array", () => {
      expect(Array.isArray(Component[1].children)).toBe(true);
    });
    test("children contain correct text string", () => {
      expect(Component[1].children[0]).toBe("hello");
    });
  });
});

describe("2-level deep nested element", () => {
  const Component = (
    <main>
      <header>
        <h1>hello</h1>
        <h2>world</h2>
      </header>
    </main>
  );
  test("match snapshot", () => {
    expect(Component).toMatchSnapshot();
  });
  test("returns tuple", () => {
    expect(Array.isArray(Component)).toBe(true);
  });
  test("first element of tuple is tag", () => {
    expect(Component[0]).toBe("main");
  });
  test("second element of tuple is props object", () => {
    expect(typeof Component[1]).toBe("object");
  });
  test("second element of tuple has children", () => {
    expect(Component[1]).toHaveProperty("children");
  });
  test("children are an array", () => {
    expect(Array.isArray(Component[1].children)).toBe(true);
  });
  test("children contain next child node", () => {
    expect(Component[1].children[0][0]).toBe("header");
  });
  test("hello world be present", () => {
    expect(Component[1].children[0][1].children[0][1].children[0]).toBe(
      "hello"
    );
    expect(Component[1].children[0][1].children[1][1].children[0]).toBe(
      "world"
    );
  });

  describe("Resolves text nodes", () => {
    const Component = (
      <h1>
        hello <span>my</span>
        <h2>world</h2>
        friend
      </h1>
    );
    test("match snapshot", () => {
      expect(Component).toMatchSnapshot();
    });
  });

  describe("Resolves array of nodes", () => {
    const Component = <div>{[1, 2, 3].map(val => val)}</div>;
    test("match snapshot", () => {
      expect(Component).toMatchSnapshot();
    });
  });
});

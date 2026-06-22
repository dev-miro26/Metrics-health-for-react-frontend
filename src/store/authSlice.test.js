import reducer, { userLogined, userLogOut } from "./authSlice";

describe("authSlice reducer", () => {
  const initial = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: {},
  };

  it("sets the user and auth flags on login", () => {
    const next = reducer(initial, userLogined({ name: "Ann" }));
    expect(next.isAuthenticated).toBe(true);
    expect(next.loading).toBe(false);
    expect(next.user).toEqual({ name: "Ann" });
  });

  it("clears auth state on logout", () => {
    const next = reducer(
      { ...initial, isAuthenticated: true, token: "abc" },
      userLogOut()
    );
    expect(next.isAuthenticated).toBe(false);
    expect(next.token).toBeNull();
  });
});

export interface NavigationState {
    currentPath: string;
    navigateTo: (path: string) => void;
}

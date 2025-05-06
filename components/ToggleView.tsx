import { Signal } from "@preact/signals";

type Props = {
  isGrid: Signal<boolean>;
};

export const ToggleView = ({ isGrid }: Props) => (
  <button type="button" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    onClick={() => isGrid.value = !isGrid.value}
  >
    Cambiar a vista {isGrid.value ? "Lista" : "Cuadrícula"}
  </button>
);
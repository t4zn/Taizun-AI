import { modelID } from "@/ai/providers";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { ModelPicker } from "./model-picker";

interface InputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  status: string;
  stop: () => void;
  selectedModel: modelID;
  setSelectedModel: (model: modelID) => void;
}

export const Textarea = ({
  input,
  handleInputChange,
  isLoading,
  status,
  stop,
  selectedModel,
  setSelectedModel,
}: InputProps) => {
  return (
    <div className="relative w-full pt-2">
      <ShadcnTextarea
        className="resize-none w-full rounded-2xl pr-12 pt-4 pb-16 bg-white/60 backdrop-blur-sm border-gray-300/80 focus-visible:border-gray-400/80 placeholder:text-gray-500/80 text-gray-900 shadow-lg"
        value={input}
        autoFocus
        placeholder={"Send a message..."}
        // @ts-expect-error err
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !isLoading) {
              // @ts-expect-error err
              const form = e.target.closest("form");
              if (form) form.requestSubmit();
            }
          }
        }}
      />
      <ModelPicker
        setSelectedModel={setSelectedModel}
        selectedModel={selectedModel}
      />

      {status === "streaming" || status === "submitted" ? (
        <button
          type="button"
          onClick={stop}
          className="cursor-pointer absolute right-2 bottom-2 rounded-full p-2 bg-white/60 backdrop-blur-sm text-gray-900 hover:bg-white/70 disabled:bg-white/10 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          <div className="animate-spin h-4 w-4">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </button>
      ) : (
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 bottom-2 rounded-full p-2 bg-white/60 backdrop-blur-sm text-gray-900 hover:bg-white/70 disabled:bg-white/10 disabled:text-gray-400/50 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

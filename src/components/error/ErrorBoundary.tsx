import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Boundary Caught Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white/5 border border-red-500/20 p-10 rounded-[2rem]">
            <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
            <h2 className="text-white font-black italic uppercase text-xl">Module Crash</h2>
            <p className="text-slate-400 text-sm mt-2 mb-6">A component failed to load. Try refreshing or contact support.</p>
            
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-black font-black rounded-xl uppercase text-xs flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={14} /> Reload Interface
            </button>

            {/* Support for both Vite and Webpack env checks */}
            {(import.meta.env?.DEV || (typeof process !== 'undefined' && process.env.NODE_ENV === 'development')) && (
              <pre className="mt-6 p-4 bg-black rounded-lg text-[10px] text-red-400 text-left overflow-auto">
                {this.state.error?.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children; // Explicitly use this.props.children
  }
}

export default ErrorBoundary;
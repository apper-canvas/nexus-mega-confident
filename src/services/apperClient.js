let apperClientInstance = null;

export const getApperClient = () => {
  if (!apperClientInstance) {
    if (!window.ApperSDK) {
      console.error('ApperSDK not loaded');
      return null;
    }

    const { ApperClient } = window.ApperSDK;
    apperClientInstance = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  return apperClientInstance;
};
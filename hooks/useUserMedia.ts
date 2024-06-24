// hooks/useUserMedia.ts
import { useState, useEffect, useCallback } from "react";

type MediaStreamConstraints = {
  audio?: boolean;
  video?: boolean;
};

type UseUserMediaResult = {
  stream: MediaStream | null;
  error: string | null;
  start: () => void;
  stop: () => void;
};

const useUserMedia = (
  constraints: MediaStreamConstraints
): UseUserMediaResult => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setStream(null);
      });
  }, [constraints]);

  const stop = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { stream, error, start, stop };
};

export default useUserMedia;

import { ParticleEngine, ParticleEngineProps } from "./particle-engine";

export { ParticleEngine };
export type { ParticleEngineProps };

/**
 * Re-export NetworkField as ParticleEngine for backwards compatibility.
 */
export function NetworkField(props: ParticleEngineProps) {
  return <ParticleEngine {...props} />;
}

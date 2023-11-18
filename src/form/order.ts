export interface HighwayPreviewRequest {
  data: string
}

export interface HighwayStartRequest {
  position_id: number
}

export interface HighwayEndRequest {
  order_sn: string
  position_id: number
}

export interface ChargeEndRequest {
  id: number
}

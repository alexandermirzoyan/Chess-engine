import {
  bishopEvalBlack,
  bishopEvalWhite,
} from "../../constants/evaluates/bishop";
import { kingEvalBlack, kingEvalWhite } from "../../constants/evaluates/king";
import { knightEval } from "../../constants/evaluates/knight";
import { pawnEvalBlack, pawnEvalWhite } from "../../constants/evaluates/pawn";
import { evalQueen } from "../../constants/evaluates/queen";
import { rookEvalBlack, rookEvalWhite } from "../../constants/evaluates/rook";
import { EPieceAsciis } from "../../models/enums/PieceAsciis.enum";
import { EPlayer } from "../../models/enums/Player.enum";
import { IPiece } from "../../models/Piece";

export default function getPieceValue(piece: IPiece, position: number) {
  let pieceValue = 0;

  if (piece.ascii == null) {
    return 0;
  }

  let x = Math.floor(position / 8);
  let y = position % 8;

  switch (piece.ascii.toLowerCase()) {
    case "p":
      pieceValue =
        100 +
        10 * (piece.ascii === "p" ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
      break;
    case EPieceAsciis.whiteRook:
      pieceValue =
        525 +
        10 * (piece.ascii === EPieceAsciis.whiteRook ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
      break;
    case "n":
      pieceValue = 350 + 10 * knightEval[y][x];
      break;
    case "b":
      pieceValue =
        350 +
        10 *
          (piece.ascii === "b" ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
      break;
    case EPieceAsciis.whiteQueen:
      pieceValue = 1000 + 10 * evalQueen[y][x];
      break;
    case EPieceAsciis.whiteKing:
      pieceValue =
        10000 +
        10 * (piece.ascii === EPieceAsciis.whiteKing ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
      break;
    default:
      pieceValue = 0;
      break;
  }

  return piece.player === EPlayer.black ? pieceValue : -pieceValue;
}

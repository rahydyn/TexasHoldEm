// functions for judgement
function judgeHands(hand) {
  let strength = [-1, -1, -1];
  let flush = -1;
  let straight = -1;
  let num_pair1 = -1;
  let num_pair2 = -1;
  let threeofakinds = -1;
  let fourofakinds = -1;
  let kicker = -1;

  flush = isFlush(hand);
  straight = isStraight(hand);
  [num_pair1, num_pair2, threeofakinds, fourofakinds, kicker] = cntPairs(hand);
  // straightflush
  if (flush >= 0 && straight >= 0) {
    strength[0] = 8;
    strength[1] = flush;
    strength[3] = "Straight Flush";
    return strength;
  }
  // fourofakinds
  if (fourofakinds >= 0) {
    strength[0] = 7;
    strength[1] = fourofakinds;
    strength[2] = kicker;
    strength[3] = "Four-of-a-Kind";
    return strength;
  }
  // fullhouse
  if (threeofakinds >= 0 && num_pair1 >= 0) {
    strength[0] = 6;
    strength[1] = threeofakinds;
    strength[2] = num_pair1;
    strength[3] = "Full House";
    return strength;
  }
  // flush
  if (flush >= 0) {
    strength[0] = 5;
    strength[1] = flush;
    strength[3] = "Flush";
    return strength;
  }
  // straight
  if (straight >= 0 && num_pair1 == -1 && threeofakinds == -1) {
    strength[0] = 4;
    strength[1] = straight;
    strength[3] = "Straight";
    return strength;
  }
  // threeofakinds
  if (threeofakinds >= 0) {
    strength[0] = 3;
    strength[1] = threeofakinds;
    strength[2] = kicker;
    strength[3] = "Three-of-a-Kind";
    return strength;
  }
  // twopairs
  if (num_pair2 >= 0) {
    strength[0] = 2;
    strength[1] = num_pair2;
    strength[2] = num_pair1;
    strength[3] = "Two-Pair";
    return strength;
  }
  // onepair
  if (num_pair1 >= 0) {
    strength[0] = 1;
    strength[1] = num_pair1;
    strength[2] = kicker;
    strength[3] = "One-Pair";
    return strength;
  }
  // highcard
  strength[0] = 0;
  strength[1] = kicker;
  strength[3] = "High Card";
  return strength;
}

function isFlush(hand) {
  let flush = -1;
  if (
    hand[1][0] == hand[2][0] &&
    hand[2][0] == hand[3][0] &&
    hand[3][0] == hand[4][0] &&
    hand[4][0] == hand[0][0]
  ) {
    let max = Math.max.apply(
      null,
      hand.map((item) => item[1])
    );
    let min = Math.min.apply(
      null,
      hand.map((item) => item[1])
    );
    if (min == 0) {
      flush = 13;
    } else {
      flush = max;
    }
  }
  return flush;
}

function isStraight(hand) {
  let straight = -1;
  let max = Math.max.apply(
    null,
    hand.map((item) => item[1])
  );
  let min = Math.min.apply(
    null,
    hand.map((item) => item[1])
  );
  let diff = max - min;
  if (diff == 4) {
    straight = max;
  } else if (diff == 12) {
    let min2 = hand
      .map((item) => item[1])
      .sort(function (a, b) {
        return a - b;
      })[1];
    if (max - min2 == 3) {
      straight = 13;
    }
  }
  return straight;
}

function cntPairs(hand) {
  let num_pair1 = -1;
  let num_pair2 = -1;
  let threeofakinds = -1;
  let fourofakinds = -1;
  let kicker = -1;
  let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let k = 0; k < 13; k++) {
    for (let i = 0; i < 5; i++) {
      if (hand[i][1] == k) {
        count[k] += 1;
      }
    }
  }
  // console.log(count);
  // pair
  let pair_flg = 0;
  for (let j = 0; j < 13; j++) {
    if (pair_flg == 0) {
      if (count[j] == 2) {
        if (j == 0) {
          num_pair1 = 13;
        } else {
          num_pair1 = j;
        }
        pair_flg = 1;
      }
    } else if (pair_flg == 1) {
      if (count[j] == 2) {
        num_pair2 = j;
        if (num_pair1 == 13) {
          num_pair2 = 13;
          num_pair1 = j;
        }
      }
    }
    if (count[j] == 3) {
      if (j == 0) {
        threeofakinds = 13;
      } else {
        threeofakinds = j;
      }
    }
    if (count[j] == 4) {
      if (j == 0) {
        fourofakinds = 13;
      } else {
        fourofakinds = j;
      }
    }
    if (count[j] == 1) {
      kicker = j;
    }
  }
  if (count[0] == 1) {
    kicker = 13;
  }
  return [num_pair1, num_pair2, threeofakinds, fourofakinds, kicker];
}

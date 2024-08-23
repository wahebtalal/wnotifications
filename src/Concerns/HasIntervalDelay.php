<?php

namespace Wahebtalal\WNotifications\Concerns;

use Closure;

trait HasIntervalDelay
{
    protected int | string | Closure | null $intervalDelay = 16;

    public function intervalDelay(int | string | Closure | null $intervalDelay): static
    {
        $this->intervalDelay = $intervalDelay;

        return $this;
    }

    public function getIntervalDelay(): int | string | null
    {
        return $this->intervalDelay;
    }

    public function FramesPerSeconds(float $frames): static
    {
        $this->intervalDelay((int) (1000 / $frames));

        return $this;
    }
}

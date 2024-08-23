<?php

namespace Wahebtalal\WNotifications\Concerns;

use Closure;

trait HasBlur
{
    protected bool | string | Closure $isBlur = false;

    public function getIsBlur(): bool | Closure | string
    {
        return $this->isBlur;
    }

    public function isBlur(bool | Closure | string $isBlur=true): static
    {
        $this->isBlur = $isBlur;

        return $this;
    }
}

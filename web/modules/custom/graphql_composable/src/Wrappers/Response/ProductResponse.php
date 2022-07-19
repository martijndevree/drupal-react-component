<?php

declare(strict_types = 1);

namespace Drupal\graphql_composable\Wrappers\Response;

use Drupal\Core\Entity\EntityInterface;
use Drupal\graphql\GraphQL\Response\Response;

/**
 * Type of response used when a product is returned.
 */
class ProductResponse extends Response {

  /**
   * The product to be served.
   *
   * @var \Drupal\Core\Entity\EntityInterface|null
   */
  protected $product;

  /**
   * Sets the content.
   *
   * @param \Drupal\Core\Entity\EntityInterface|null $product
   *   The product to be served.
   */
  public function setProduct(?EntityInterface $product): void {
    $this->product = $product;
  }

  /**
   * Gets the product to be served.
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   *   The product to be served.
   */
  public function product(): ?EntityInterface {
    return $this->product;
  }

}
